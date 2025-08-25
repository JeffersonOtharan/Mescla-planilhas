import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Select, MenuItem, InputLabel, FormControl, Stepper, Step, StepLabel, Card, CardContent, CircularProgress, Snackbar, Alert, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Home as HomeIcon, BugReport as BugIcon } from '@mui/icons-material';
import axios from 'axios';

const steps = ['Upload das Planilhas', 'Selecionar Chaves', 'Selecionar Colunas', 'Gerar e Baixar'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [columns1, setColumns1] = useState([]);
  const [columns2, setColumns2] = useState([]);
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [allColumns, setAllColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [fileRefs, setFileRefs] = useState({});
  const [mergedFile, setMergedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [errorLogs, setErrorLogs] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // Função para voltar ao início
  const handleHome = () => {
    setActiveStep(0);
    setFile1(null);
    setFile2(null);
    setColumns1([]);
    setColumns2([]);
    setKey1('');
    setKey2('');
    setAllColumns([]);
    setSelectedColumns([]);
    setColumnOrder([]);
    setFileRefs({});
    setMergedFile(null);
  };

  // Função para capturar erros detalhados
  const captureError = (operation, error) => {
    const errorDetails = {
      operation,
      timestamp: new Date().toISOString(),
      message: error.response?.data?.error || error.response?.data?.message || error.message || 'Erro desconhecido',
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      fullError: error
    };
    
    console.error(`❌ Erro em ${operation}:`, errorDetails);
    setErrorLogs(errorDetails);
    setShowErrorDialog(true);
    
    return errorDetails.message;
  };

  // Função para selecionar todas as colunas
  const handleSelectAll = () => {
    if (selectedColumns.length === allColumns.length) {
      // Desmarcar todas
      setSelectedColumns([]);
      setColumnOrder([]);
    } else {
      // Marcar todas
      setSelectedColumns([...allColumns]);
      setColumnOrder([...allColumns]);
    }
  };

  // Upload das planilhas e leitura das colunas
  const handleUpload = async () => {
    if (!file1 || !file2) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);
      const res = await axios.post('https://planilhasassist-7044f68cafa1.herokuapp.com/upload', formData);
      setFileRefs(res.data);
      // Buscar colunas
      const colRes = await axios.post('https://planilhasassist-7044f68cafa1.herokuapp.com/columns', res.data);
      setColumns1(colRes.data.columns1);
      setColumns2(colRes.data.columns2);
      // Todas as colunas únicas
      const all = [...colRes.data.columns1, ...colRes.data.columns2.filter(c => !colRes.data.columns1.includes(c))];
      setAllColumns(all);
      setSelectedColumns([]); // Por padrão, nenhuma selecionada
      setColumnOrder([]); // Ordem inicial vazia
      setActiveStep(1);
    } catch (e) {
      const errorMessage = captureError('Upload', e);
      setSnackbar({ 
        open: true, 
        message: `Erro ao carregar planilhas: ${errorMessage}`, 
        severity: 'error' 
      });
    }
    setLoading(false);
  };

  // Avançar para seleção de colunas
  const handleSelectKeys = () => {
    if (!key1 || !key2) {
      setSnackbar({ open: true, message: 'Selecione as chaves!', severity: 'warning' });
      return;
    }
    setActiveStep(2);
  };

  // Gerar planilha
  const handleMerge = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://planilhasassist-7044f68cafa1.herokuapp.com/merge', {
        ...fileRefs,
        key1,
        key2,
        columnOrder: columnOrder
      });
      setMergedFile(res.data.file);
      setActiveStep(3);
    } catch (e) {
      const errorMessage = captureError('Merge', e);
      setSnackbar({ 
        open: true, 
        message: `Erro ao gerar planilha: ${errorMessage}`, 
        severity: 'error' 
      });
    }
    setLoading(false);
  };

  // Download
  const handleDownload = () => {
    axios({
      url: `https://planilhasassist-7044f68cafa1.herokuapp.com/download?file=${encodeURIComponent(mergedFile)}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'planilha_final.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch((e) => {
      const errorMessage = captureError('Download', e);
      setSnackbar({ 
        open: true, 
        message: `Erro no download: ${errorMessage}`, 
        severity: 'error' 
      });
    });
  };

  // Função para selecionar/deselecionar coluna
  const handleColumnToggle = (col) => {
    let newSelected = [...selectedColumns];
    let newOrder = [...columnOrder];
    
    if (selectedColumns.includes(col)) {
      // Remove a coluna
      newSelected = selectedColumns.filter(c => c !== col);
      newOrder = columnOrder.filter(c => c !== col);
    } else {
      // Adiciona a coluna no final
      newSelected = [...selectedColumns, col];
      newOrder = [...columnOrder, col];
    }
    
    setSelectedColumns(newSelected);
    setColumnOrder(newOrder);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          {/* Botão HOME */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" color="primary">Juntar Planilhas</Typography>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={handleHome}
                size="small"
              >
                HOME
              </Button>
            )}
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {/* Passo 1: Upload */}
          {activeStep === 0 && (
            <Box textAlign="center">
              <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
                <Button variant="outlined" component="label">
                  Escolher arquivo 1
                  <input type="file" accept=".xlsx,.xls,.csv" hidden onChange={e => setFile1(e.target.files[0])} />
                </Button>
                <span>{file1 ? file1.name : "Nenhum arquivo escolhido"}</span>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
                <Button variant="outlined" component="label">
                  Escolher arquivo 2
                  <input type="file" accept=".xlsx,.xls,.csv" hidden onChange={e => setFile2(e.target.files[0])} />
                </Button>
                <span>{file2 ? file2.name : "Nenhum arquivo escolhido"}</span>
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading || !file1 || !file2}>
                  {loading ? <CircularProgress size={24} /> : 'CARREGAR PLANILHAS'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Passo 2: Seleção de chaves */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Selecione a coluna chave de cada planilha</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Chave Planilha 1</InputLabel>
                    <Select value={key1} label="Chave Planilha 1" onChange={e => setKey1(e.target.value)}>
                      {columns1.map(col => <MenuItem key={col} value={col}>{col}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Chave Planilha 2</InputLabel>
                    <Select value={key2} label="Chave Planilha 2" onChange={e => setKey2(e.target.value)}>
                      {columns2.map(col => <MenuItem key={col} value={col}>{col}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSelectKeys}>Próximo</Button>
              </Box>
            </Box>
          )}

          {/* Passo 3: Seleção de colunas */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Selecione as colunas desejadas</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Marque as colunas que deseja incluir na planilha final. A ordem será definida pela sequência de seleção.
              </Typography>
              
              {/* Caixinha para selecionar todas */}
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedColumns.length === allColumns.length && allColumns.length > 0}
                      indeterminate={selectedColumns.length > 0 && selectedColumns.length < allColumns.length}
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  }
                  label={`Selecionar todas as colunas (${selectedColumns.length}/${allColumns.length})`}
                  sx={{ 
                    '& .MuiFormControlLabel-label': {
                      fontWeight: 'bold',
                      color: '#1976d2'
                    }
                  }}
                />
              </Box>

              <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, background: '#f9f9f9', maxHeight: 300, overflowY: 'auto' }}>
                {allColumns.map((col, idx) => (
                  <FormControlLabel
                    key={col}
                    control={
                      <Checkbox
                        checked={selectedColumns.includes(col)}
                        onChange={() => handleColumnToggle(col)}
                        color="primary"
                      />
                    }
                    label={`${col} ${selectedColumns.includes(col) ? `(${columnOrder.indexOf(col) + 1}º)` : ''}`}
                    sx={{ 
                      display: 'block', 
                      mb: 1,
                      '& .MuiFormControlLabel-label': {
                        fontWeight: selectedColumns.includes(col) ? 'bold' : 'normal',
                        color: selectedColumns.includes(col) ? '#1976d2' : 'inherit'
                      }
                    }}
                  />
                ))}
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2" color="primary">
                  Colunas selecionadas ({selectedColumns.length}): {selectedColumns.join(', ')}
                </Typography>
              </Box>
              <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleMerge} disabled={selectedColumns.length === 0 || loading}>
                  {loading ? <CircularProgress size={24} /> : 'Juntar e Gerar Planilha'}
                </Button>
              </Box>
            </Box>
          )}

          {/* Passo 4: Download */}
          {activeStep === 3 && (
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>Pronto! Baixe sua planilha final:</Typography>
              <Button variant="contained" color="success" size="large" onClick={handleDownload}>Baixar Planilha Final</Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Modal de Logs de Erro */}
      <Dialog 
        open={showErrorDialog} 
        onClose={() => setShowErrorDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <BugIcon color="error" />
            <Typography variant="h6">Logs de Erro Detalhados</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {errorLogs && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Operação:</strong> {errorLogs.operation}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Timestamp:</strong> {new Date(errorLogs.timestamp).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Status:</strong> {errorLogs.status} {errorLogs.statusText}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>URL:</strong> {errorLogs.url}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Método:</strong> {errorLogs.method}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Mensagem:</strong> {errorLogs.message}
              </Typography>
              
              {errorLogs.data && (
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Dados do Erro:</strong>
                  </Typography>
                  <Box 
                    sx={{ 
                      bgcolor: '#f5f5f5', 
                      p: 2, 
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      maxHeight: 200,
                      overflow: 'auto'
                    }}
                  >
                    <pre>{JSON.stringify(errorLogs.data, null, 2)}</pre>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowErrorDialog(false)}>Fechar</Button>
          <Button 
            onClick={() => {
              if (errorLogs) {
                navigator.clipboard.writeText(JSON.stringify(errorLogs, null, 2));
                setSnackbar({ 
                  open: true, 
                  message: 'Logs copiados para a área de transferência!', 
                  severity: 'success' 
                });
              }
            }}
            variant="outlined"
          >
            Copiar Logs
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App; 
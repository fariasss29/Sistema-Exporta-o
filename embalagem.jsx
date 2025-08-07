/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import BackdropLoading from '@/components/BackdropLoading';
import Error from '@/components/Error';
import axios from '@/services/axios';
import {
    Box,
    TextField,
    Typography,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';

export default function Embalagem({ methods }) {
    const [loaded, setLoaded] = useState(false);
    const [openPioModal, setOpenPioModal] = useState(false);
    const [tempPioSelection, setTempPioSelection] = useState(null);

    const isVendaSelectionByUser = useRef(false);

    useEffect(() => setLoaded(true), []);

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors }
    } = methods;

    const condicoesFaturamento = watch('condicoes_faturamento');
    const possuiPioConfirmado = watch('possui_pio_confirmado');

    useEffect(() => {
        if (
            condicoesFaturamento === 'venda' &&
            isVendaSelectionByUser.current &&
            !openPioModal &&
            !possuiPioConfirmado 
        ) {
            setOpenPioModal(true);
            setTempPioSelection(possuiPioConfirmado ? 'sim' : 'nao');
        } else if (
            condicoesFaturamento !== 'venda' &&
            openPioModal
        ) {
            setOpenPioModal(false);
            setValue('possui_pio_confirmado', false); 
            isVendaSelectionByUser.current = false;
            setTempPioSelection(null);
        }
    }, [condicoesFaturamento, openPioModal, setValue, possuiPioConfirmado]);

    const qtdPecas = parseFloat(watch('qtd_pecas') || 0);
    const valorUnit = parseFloat((watch('valor_unit') || '0').replace(/,/g, '.'));
    const total = qtdPecas * valorUnit;

    useEffect(() => {
        setValue('valor_total', total.toFixed(2).replace('.', ','));
    }, [total, setValue]);

  
    const anim = (delay) => ({
        opacity: loaded ? 1 : 0.3,
        transform: loaded ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`
    });

    const handleModalClose = () => {
        handleCancelPioSelection();
    };

    const handleSavePioSelection = () => {
        if (tempPioSelection === 'sim') {
            setValue('possui_pio_confirmado', true);
      
        } else { 
            setValue('possui_pio_confirmado', false);    
            setValue('condicoes_faturamento', '');
            isVendaSelectionByUser.current = false; 
        }
        setOpenPioModal(false);
        setTempPioSelection(null);
    };

    const handleCancelPioSelection = () => {
        setValue('condicoes_faturamento', '');
        setValue('possui_pio_confirmado', false);
        setOpenPioModal(false);
        isVendaSelectionByUser.current = false; 
        setTempPioSelection(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                width: '100%',
            }}
        >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3,1fr)',
                        gap: 2,
                        mb: 2,
                        ...anim(100)
                    }}
                >
                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Tipo de embalagem *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.tipo_embalagem ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <Controller
                                name="tipo_embalagem"
                                control={control}
                                rules={{ required: 'Selecione o tipo de embalagem!' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <FormControlLabel
                                            value="madeira"
                                            control={<Radio />}
                                            label="Caixa de Madeira"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="papelao"
                                            control={<Radio />}
                                            label="Caixa de Papelão"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="pallet"
                                            control={<Radio />}
                                            label="Pallet"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                }
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                        {errors.tipo_embalagem && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.tipo_embalagem.message}
                            </Alert>
                        )}
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Material empilhável *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.material_empilhavel ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                height: 143,
                                p: 2
                            }}
                        >
                            <Controller
                                name="material_empilhavel"
                                control={control}
                                rules={{ required: 'Selecione se o material pode ser empilhável!' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <FormControlLabel
                                            value="sim"
                                            control={<Radio />}
                                            label="Sim"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',

                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="nao"
                                            control={<Radio />}
                                            label="Não"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                }
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                        {errors.material_empilhavel && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.material_empilhavel.message}
                            </Alert>
                        )}
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Condições de faturamento *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.condicoes_faturamento ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2
                            }}
                        >
                            <Controller
                                name="condicoes_faturamento"
                                control={control}
                                rules={{ required: 'Selecione o tipo de condição de faturamento!' }}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e); 
                                            if (e.target.value === 'venda') {
                                                isVendaSelectionByUser.current = true; 
                                            } else {
                                                isVendaSelectionByUser.current = false; 
                                                setValue('possui_pio_confirmado', false); 
                                            }
                                        }}
                                    >
                                        <FormControlLabel
                                            value="amostra_sem_valor"
                                            control={<Radio />}
                                            label="Amostra sem valor comercial"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="amostra"
                                            control={<Radio />}
                                            label="Amostra"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            value="venda"
                                            control={<Radio />}
                                            label="Venda"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                }
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                        {errors.condicoes_faturamento && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.condicoes_faturamento.message}
                            </Alert>
                        )}
                    </Box>
                </Box>

                <input type="hidden" {...register('possui_pio_confirmado')} />


                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3,1fr)',
                        gap: 2,
                        mb: 2,
                        mt: -2,
                        ...anim(200)
                    }}
                >
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Contato Cliente
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Contato cliente:"
                            {...register('contato_cliente',)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        {errors.contato_cliente && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.contato_cliente.message}
                            </Alert>
                        )}
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Solicitante
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="solicitante:"
                            {...register('solicitante',)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Financeiro
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="financeiro:"
                            {...register('financeiro',)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>
                </Box>
            </Box>

            <Dialog open={openPioModal} onClose={handleModalClose} sx={{
                '& .MuiDialog-paper': {
                    width: 500,
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                    p: 2
                },
                '& .MuiDialog-backdrop': {
                    backdropFilter: 'blur(3px)',
                },
            }}>
                <DialogTitle variant="h5" sx={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>Possui PIO?</DialogTitle>
                <DialogContent sx={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center',
                }}>
                    <Typography sx={{
                        fontSize: '1.3rem',
                        color: 'text.secondary',
                        mb: 2,
                        textAlign: 'center'
                    }}>A condição de venda selecionada possui PIO?</Typography>
                    <RadioGroup
                        aria-label="possui pio"
                        name="pio-selection"
                        value={tempPioSelection}
                        onChange={(e) => setTempPioSelection(e.target.value)}
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 4,
                            mt: 0.5
                        }}
                    >
                        <FormControlLabel value="sim" control={<Radio />} label="Sim" sx={{
                            '& .MuiFormControlLabel-label': {
                                fontSize: '1.3rem',
                                fontWeight: 'medium'
                            }
                        }} />
                        <FormControlLabel value="nao" control={<Radio />} label="Não" sx={{
                            '& .MuiFormControlLabel-label': {
                                fontSize: '1.3rem',
                                fontWeight: 'medium'
                            }
                        }} />
                    </RadioGroup>
                </DialogContent>
                <DialogActions sx={{
                    padding: '16px 24px',
                    justifyContent: 'space-around',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.default',
                    borderRadius: '0 0 12px 12px'
                }}>
                    <Button onClick={handleCancelPioSelection} color="primary" sx={{
                        minWidth: '100px',
                        py: 1.2,
                        px: 3,
                        color: 'white',
                        backgroundColor: '#8B0000',
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderRadius: '8px'
                    }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSavePioSelection} color="primary" variant="contained" disabled={tempPioSelection === null} sx={{
                        minWidth: '100px',
                        py: 1.2,
                        px: 3,
                        backgroundColor: 'green',
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderRadius: '8px'
                    }}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

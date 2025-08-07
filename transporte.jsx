/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    Typography,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export default function Transporte({ methods }) {
    const [loaded, setLoaded] = useState(false);
    const [openImpostoModal, setOpenImpostoModal] = useState(false);
    const [tempImpostoSelection, setTempImpostoSelection] = useState(null);
    const [showContactFields, setShowContactFields] = useState(false);

    const isVendaSelectionByUser = useRef(false);

    const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(00) 00000-0000" // Formato da máscara
                inputRef={ref}
                onAccept={(value) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    });

    useEffect(() => setLoaded(true), [])

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors }
    } = methods;

    const qtdPecas = parseFloat(watch('qtd_pecas') || 0);
    const valorUnit = parseFloat((watch('valor_unit') || '0').replace(/,/g, '.'));
    const total = qtdPecas * valorUnit;

    const pagamentoImposto = watch('pagamento_imposto');
    const possuiImpostoConfirmado = watch('cotacao_imposto');



    useEffect(() => {
        if (
            pagamentoImposto === 'astemo_ltda_imposto' &&
            isVendaSelectionByUser.current &&
            !openImpostoModal &&
            !possuiImpostoConfirmado
        ) {
            setOpenImpostoModal(true);
            setTempImpostoSelection(possuiImpostoConfirmado ? 'sim' : 'nao');
        } else if (
            pagamentoImposto !== 'astemo_ltda_imposto' &&
            openImpostoModal
        ) {
            setOpenImpostoModal(false);
            setValue('cotacao_imposto', false);
            isVendaSelectionByUser.current = false;
            setTempImpostoSelection(null);
            setShowContactFields(false);
        }
    }, [pagamentoImposto, openImpostoModal, setValue, possuiImpostoConfirmado]);

    useEffect(() => {
        setValue('valor_total', total.toFixed(2).replace('.', ','));
    }, [total, setValue]);

    const anim = (delay) => ({
        opacity: loaded ? 1 : 0.3,
        transform: loaded ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`
    });

    const handleModalClose = () => {
        handleCancelImpostoSelection();
    };

    // FUNÇÃO CORRIGIDA AQUI
    const handleSaveImpostoSelection = () => {
        if (tempImpostoSelection === 'sim') {
            setValue('cotacao_imposto', true);
            setShowContactFields(false);
        } else if (tempImpostoSelection === 'nao') {
            setValue('cotacao_imposto', false);
            setShowContactFields(true);
        }
        setOpenImpostoModal(false);
        setTempImpostoSelection(null);
        isVendaSelectionByUser.current = false;
    };

    const handleCancelImpostoSelection = () => {
        setValue('pagamento_imposto', 'cliente_destinatario_imposto');
        setValue('cotacao_imposto', false);
        setOpenImpostoModal(false);
        isVendaSelectionByUser.current = false;
        setTempImpostoSelection(null);
        setShowContactFields(false);
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
                            Modalidade embarque *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.modalidade_embarque ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2,
                                height: 233
                            }}
                        >
                            <Controller
                                name="modalidade_embarque"
                                control={control}
                                rules={{ required: 'Selecione o tipo modalidade do embarque!' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <FormControlLabel
                                            value="courier"
                                            control={<Radio />}
                                            label="Courier"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="areo"
                                            control={<Radio />}
                                            label="Áreo"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="maritimo"
                                            control={<Radio />}
                                            label="Marítimo"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="rodoviario"
                                            control={<Radio />}
                                            label="Rodoviário"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Empresa *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.empresa ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2,
                                height: 233
                            }}
                        >
                            <Controller
                                name="empresa"
                                control={control}
                                rules={{ required: 'Selecione o tipo modalidade do embarque!' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <FormControlLabel
                                            value="fedex"
                                            control={<Radio />}
                                            label="Fedex"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="dhl"
                                            control={<Radio />}
                                            label="DHL"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="tnt"
                                            control={<Radio />}
                                            label="TNT"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                        <FormControlLabel
                                            value="opcao_mais_barata"
                                            control={<Radio />}
                                            label="Opção mais barata"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                                mb: 0.5
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Pagamento do frete *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.pagamento_frete ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <Controller
                                name="pagamento_frete"
                                control={control}
                                rules={{ required: 'Selecione quem paga o frete!' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <FormControlLabel
                                            value="astemo_ltda_frete"
                                            control={<Radio />}
                                            label="Astemo ltda"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                },
                                                mb: -1,
                                            }}
                                        />
                                        <FormControlLabel
                                            value="cliente_destinatario_frete"
                                            control={<Radio />}
                                            label="Cliente/Destinatário"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                            Pagamento do imposto *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.pagamento_imposto ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <Controller
                                name="pagamento_imposto"
                                control={control}
                                rules={{ required: 'Selecione quem paga o imposto!' }}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            if (e.target.value === 'astemo_ltda_imposto') {
                                                isVendaSelectionByUser.current = true;
                                            } else {
                                                isVendaSelectionByUser.current = false;
                                                setValue('cotacao_imposto', false);
                                                setShowContactFields(false);
                                            }
                                        }}
                                    >
                                        <FormControlLabel
                                            value="astemo_ltda_imposto"
                                            control={<Radio />}
                                            label="Astemo ltda"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem',
                                                },
                                                mb: -1,
                                            }}
                                        />
                                        <FormControlLabel
                                            value="cliente_destinatario_imposto"
                                            control={<Radio />}
                                            label="Cliente/Destinatário"
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '1.25rem'
                                                },
                                            }}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Box>
                    </Box>
                    <input type="hidden" {...register('cotacao_imposto')} />
                </Box>

                {showContactFields && (
                    <Box sx={{ ...anim(200), mb: 2, mt: -2, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Cotação de Imposto
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                            Por favor, deixe seus dados para que possamos entrar em contato e realizar a cotação.
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Nome do Contato:"
                                {...register('nome_contato_imposto', { required: 'Informe o nome do contato!' })}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                error={!!errors.nome_contato_imposto}
                                helperText={errors.nome_contato_imposto?.message}
                            />
                            <Controller
                                name="telefone_contato_imposto"
                                control={control}
                                rules={{
                                    required: 'Informe o telefone!',
                                    pattern: {
                                        value: /^\(\d{2}\) \d{5}-\d{4}$/,
                                        message: 'Telefone inválido. Utilize o formato (DD) 9XXXX-XXXX.'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Telefone:"
                                        InputProps={{
                                            inputComponent: TextMaskCustom,
                                        }}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        error={!!errors.telefone_contato_imposto}
                                        helperText={errors.telefone_contato_imposto?.message}
                                    />
                                )}
                            />
                            <TextField
                                fullWidth
                                label="Email:"
                                {...register('email_cotacao', { required: 'Informe o email para contato!' })}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2,1fr)',
                        gap: 2,
                        mb: 2,
                        mt: -2,
                        ...anim(200)
                    }}
                >
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Motivo do embarque/projeto
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Motivo embarque:"
                            {...register('motivo_embarque',)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Utilização no destino
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="finalidade para o cliente:"
                            {...register('utilizacao_destino',)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>
                </Box>
            </Box>

            <Dialog open={openImpostoModal} onClose={handleModalClose} sx={{
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
                }}>Possui Cotação para imposto?</DialogTitle>
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
                    }}>A condição de pagamento selecionada já possui cotação de impostos?</Typography>
                    <RadioGroup
                        aria-label="possui cotacao"
                        name="impostos-selection"
                        value={tempImpostoSelection}
                        onChange={(e) => setTempImpostoSelection(e.target.value)}
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
                    <Button onClick={handleCancelImpostoSelection} color="primary" sx={{
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
                    <Button onClick={handleSaveImpostoSelection} color="primary" variant="contained" disabled={tempImpostoSelection === null} sx={{
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
    )
}

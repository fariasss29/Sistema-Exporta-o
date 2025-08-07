/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import BackdropLoading from '@/components/BackdropLoading'
import Error from '@/components/Error'
import axios from '@/services/axios'
import {
    Box,
    TextField,
    Typography,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
    Autocomplete
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'

export default function Estoque({ methods }) {
    

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setLoaded(false);
        setTimeout(() => setLoaded(true), 100);
    }, [location]);

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors }
    } = methods

    const tipoFormulario = watch('tipo_formulario');

    // Calcular total
    const qtdPecas = parseFloat(watch('qtd_pecas') || 0)
    const valorUnit = parseFloat((watch('valor_unit') || '0').replace(/,/g, '.'))
    const total = qtdPecas * valorUnit

    // Atualiza valor_total oculto

    useEffect(() => {
        setValue('valor_total', total.toFixed(2).replace('.', ','))
    }, [total, setValue])

    // Busca funcionários (exemplo)
    const { isLoading, error } = useQuery('Funcionario Pedido', () =>
        axios.get('/indiretos/funcionarios').then((res) => res.data)
    )
    if (isLoading) return <BackdropLoading />
    if (error) return <Error error={error.response.data} />

    // Animações de entrada
    const anim = (delay) => ({
        opacity: loaded ? 1 : 0.3,
        transform: loaded ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`
    })

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
                        gridTemplateColumns: tipoFormulario === 'padrao' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                        gap: 2,
                        mb: 2,
                        ...anim(100)
                    }}
                >
                     
                    {tipoFormulario === 'padrao' && (
                        <>
                            <Box sx={{ ...anim(300) }}>
                                <Typography variant="h6" gutterBottom>
                                    Movimentação do estoque *
                                </Typography>
                                <Box
                                    sx={{
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: errors.movimentacao_estoque ? 'error.main' : 'grey.300',
                                        borderRadius: 4,

                                        p: 2
                                    }}
                                >
                                    <Controller
                                        name="movimentacao_estoque"
                                        control={control}
                                        rules={{ required: 'Selecione se o material tem movimentação no estoque!' }}
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
                                {errors.movimentacao_estoque && (
                                    <Alert severity="error" sx={{ mt: 1 }}>
                                        {errors.movimentacao_estoque.message}
                                    </Alert>
                                )}
                            </Box>
                        </>
                    )}


                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Material com retorno *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.tipo_embalagem ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2
                            }}
                        >
                            <Controller
                                name="material_retorno"
                                control={control}
                                rules={{ required: 'Selecione se é um material com retorno!' }}
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

                        {errors.material_retorno && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.material_retorno.message}
                            </Alert>
                        )}
                    </Box>




                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Caracteriza uma devolução *
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: errors.tipo_embalagem ? 'error.main' : 'grey.300',
                                borderRadius: 4,
                                p: 2
                            }}
                        >
                            <Controller
                                name="caracteriza_devolucao"
                                control={control}
                                rules={{ required: 'Selecione se o material caracteriza uma devolução!' }}
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

                        {errors.caracteriza_devolucao && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.caracteriza_devolucao.message}
                            </Alert>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

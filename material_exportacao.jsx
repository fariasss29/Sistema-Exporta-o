/* eslint-disable react/prop-types */
import BackdropLoading from '@/components/BackdropLoading'
import Error from '@/components/Error'
import axios from '@/services/axios'
import { Autocomplete, Box, TextField, Typography, Alert, IconButton, Modal } from '@mui/material'
import { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Box3D from '@/pages/exportacao/box3D'
import { RiBox3Line } from "react-icons/ri";

export default function MaterialExportacao({ methods }) {

    const [loaded, setLoaded] = useState(false)
    const [is3DViewerOpen, setIs3DViewerOpen] = useState(false)
    const [showDimAlert, setShowDimAlert] = useState(false) // Estado para controlar a exibição do alert

    useEffect(() => {
        setLoaded(true)
    }, [])

    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
        trigger
    } = methods

    const qtdPecas = parseFloat(watch('qtd_pecas') || 0)
    const valorUnit = parseFloat((watch('valor_unit') || '0').replace(/,/g, '.'))
    const total = qtdPecas * valorUnit

    const dimensoes = watch('dimensoes')
    const parseDimensions = (dimString) => {
        const parts = dimString?.split(/[x×]/g).map(Number).filter(n => !isNaN(n) && n > 0);
        if (parts?.length === 3) {
            return { width: parts[0] / 100, height: parts[1] / 100, depth: parts[2] / 100 };
        }
        return null;
    };
    const parsedDims = parseDimensions(dimensoes);


    useEffect(() => {
        const str = total.toFixed(0) + ','
        setValue('valor_total', str)
    }, [total, setValue])

    useEffect(() => {
        const currentPesoLiquido = watch('peso_liquido_item');
        const currentPesoBruto = watch('peso_bruto_caixa');

        if (currentPesoBruto !== null && currentPesoBruto !== undefined && currentPesoLiquido !== null && currentPesoLiquido !== undefined) {
            trigger('peso_bruto_caixa');
        }
    }, [watch('peso_liquido_item'), trigger, watch('peso_bruto_caixa')]);

    const {
        isLoading,
        error,
        data: funcionarios
    } = useQuery('Funcionario Pedido', () =>
        axios.get('/indiretos/funcionarios').then((res) => res.data)
    )

    if (isLoading) return <BackdropLoading />
    if (error) return <Error error={error.response.data} />

    const recursos = [
        { key: 1, value: '1' },
        { key: 2, value: '2' },
        { key: 3, value: '3' }
    ]

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
                borderRadius: 2,
                width: '100%',
                height: 'auto'
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 2,
                        ...anim(100)
                    }}
                >
                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Peso líquido por item (kg) *
                        </Typography>
                        <TextField
                            fullWidth
                            type='number'
                            placeholder="peso líquido por item:"
                            {...register('peso_liquido_item', {
                                required: 'Informe o peso líquido!',
                                valueAsNumber: true
                            })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        {errors.peso_liquido_item && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.peso_liquido_item.message}
                            </Alert>
                        )}
                    </Box>

                    {/* Peso bruto por caixa */}
                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Peso bruto por caixa (kg) *
                        </Typography>
                        <TextField
                            fullWidth
                            type='number'
                            placeholder="peso bruto por caixa:"
                            {...register('peso_bruto_caixa', {
                                valueAsNumber: true,
                                validate: (value) => {
                                    const liquido = watch('peso_liquido_item');
                                    if (value < liquido) {
                                        return 'O peso bruto não pode ser menor que o peso líquido!';
                                    }
                                    return true;
                                }
                            })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        {errors.peso_bruto_caixa && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.peso_bruto_caixa.message}
                            </Alert>
                        )}
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Qtd. cxs *
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            placeholder="quantidade de caixas:"
                            {...register('qtd_cxs', { required: true, valueAsNumber: true })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        {errors.qtd_cxs && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                Informe a quantidade de caixas!
                            </Alert>
                        )}
                    </Box>

                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Dimensões *
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Ex: 285×285×110(mm)"
                            {...register('dimensoes', { required: true })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => {
                                            if (parsedDims) {
                                                setIs3DViewerOpen(true);
                                                setShowDimAlert(false); 
                                            } else {
                                                setShowDimAlert(true); 
                                            }
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: 658 
                                        }}
                                    >
                                    <RiBox3Line style={{ fontSize: '25px' }} />
                                    </IconButton>
                                ),
                            }}
                        />
                        {errors.dimensoes && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                Informe as dimensões!
                            </Alert>
                        )}
                        {showDimAlert && !errors.dimensoes && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                Informe as dimensões antes para visualizar a imagem 3D!
                            </Alert>
                        )}
                    </Box>
                </Box>

                {/* MODAL COM A VISUALIZAÇÃO 3D */}
                <Modal
                    open={is3DViewerOpen}
                    onClose={() => setIs3DViewerOpen(false)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box sx={{ width: 800, height: 600, bgcolor: 'background.paper', p: 5, borderRadius: 8 }}>
                        <Typography variant="h6" gutterBottom>
                            Visualização da Embalagem
                        </Typography>
                        <Box sx={{ width: '100%', height: '100%', mt: 2 }}>
                            <Canvas>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1} />
                                {parsedDims && (
                                    <Box3D
                                        width={parsedDims.width}
                                        height={parsedDims.height}
                                        depth={parsedDims.depth}
                                    />
                                )}
                                <OrbitControls />
                            </Canvas>
                        </Box>
                    </Box>
                </Modal>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: 2,
                        ...anim(100)
                    }}
                >
                    {/* Descrição Material */}
                    <Box sx={{ ...anim(300) }}>
                        <Typography variant="h6" gutterBottom>
                            Descrição Material *
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="descrição material (português/inglês):"
                            {...register('descricao_material', { required: 'Informe a descrição do material!' })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    alignItems: 'flex-start',
                                    px: 2,
                                    py: 1,
                                    height: 150
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: 0
                                }
                            }}
                        />
                        {errors.descricao_material && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.descricao_material.message}
                            </Alert>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

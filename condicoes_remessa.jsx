/* eslint-disable react/prop-types */
import BackdropLoading from '@/components/BackdropLoading'
import Error from '@/components/Error'
import axios from '@/services/axios'
import { Autocomplete, Box, TextField, Typography, Alert } from '@mui/material'
import { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'

export default function FormularioRemessa({ methods }) {
  const moedaOptions = [
    { id: '1', label: 'BRL' },
    { id: '2', label: 'USD' },
    { id: '3', label: 'Iene/¥' },
  ]

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = methods

  const tipoFormulario = watch('tipo_formulario');
  const qtdPecas = parseFloat(watch('qtd_pecas') || 0)
  const valorUnit = parseFloat((watch('valor_unit') || '0').replace(/,/g, '.'))
  const total = qtdPecas * valorUnit

  useEffect(() => {
    const str = total.toFixed(0) + ','
    setValue('valor_total', str)
  }, [total, setValue])

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

  // helper para delay em ms
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
        p: 0,
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
            mb: 2,
            ...anim(100)
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Part Number *
            </Typography>
            <TextField
              fullWidth
              placeholder="código do part number:"
              {...register('part_number', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.part_number && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe o part number!
              </Alert>
            )}
          </Box>


          {tipoFormulario === 'padrao' && (
            <>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Depósito *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="código do depósito:"
                  {...register('deposito', { required: true })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    },
                  }}
                />
                {errors.deposito && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Informe o part number!
                  </Alert>
                )}
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Lote *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="código do Lote:"
                  {...register('lote', { required: true })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    },
                  }}
                />
                {errors.lote && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Informe o lote!
                  </Alert>
                )}
              </Box>
            </>
          )}

          <Box>
            <Typography variant="h6" gutterBottom>
              Taxa USD
            </Typography>
            <TextField
              fullWidth
              value={5.5963}
              disabled
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 2,
            mt: -2,
            ...anim(200)
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Qntd. Peças *
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Quantidade de peças:"
              {...register('qtd_pecas', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.qtd_pecas && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe a quantidade de peças!
              </Alert>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Moeda *
            </Typography>
            <Controller
              name="moeda"
              control={control}
              rules={{ required: 'Selecione a moeda:' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={moedaOptions}
                  getOptionLabel={(opt) => opt.label}
                  // Corrigido: Passe o objeto completo para onChange
                  onChange={(_, value) => field.onChange(value)}
                  // Corrigido: Compare a opção com o valor pelo ID para funcionar
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Selecione a moeda:"
                      error={!!errors.moeda}
                    />
                  )}
                />
              )}
            />
            {errors.moeda && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Selecione a moeda que deseja usar!
              </Alert>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Valor unit
            </Typography>
            <TextField
              fullWidth
              placeholder="Valor unitário:"
              {...register('valor_unit', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Valor total
            </Typography>
            {/* exibição formatada */}
            <TextField
              fullWidth
              placeholder="Valor total:"
              value={total.toFixed(2).replace('.', ',')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              InputProps={{ readOnly: true }}
            />
            {/* campo hidden sem value */}
            <input
              type="hidden"
              {...register('valor_total', { required: true })}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

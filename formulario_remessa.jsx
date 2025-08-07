import BackdropLoading from '@/components/BackdropLoading'
import Error from '@/components/Error'
import axios from '@/services/axios'
import { Autocomplete, Box, TextField, Typography, Alert } from '@mui/material'
import { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'

export default function FormularioRemessa({ methods }) {

  const [loaded, setLoaded] = useState(false)
  const [recursoSelected, setRecursoSelected] = useState({})

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = methods

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

  useEffect(() => {
    setLoaded(false);
    setTimeout(() => setLoaded(true), 100);
  }, [location]);

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
  });

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
          gap: 2,
        }}
      >
        {/* ROW 1 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 2,
            ...anim(100)
          }}
        >
          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Código Cliente SAP*
            </Typography>
            <TextField
              fullWidth
              placeholder="código cliente sap:"
              {...register('codigo_cliente_sap', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.codigo_cliente_sap && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe o codigo cliente sap!
              </Alert>
            )}
          </Box>

          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Empresa
            </Typography>
            <TextField
              fullWidth
              placeholder="Empresa:"
              {...register('empresa')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 2,
            mt: -1,
            ...anim(100)
          }}
        >
          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>
            <TextField
              fullWidth
              placeholder="Endereço:"
              {...register('endereco')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>

          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Cep
            </Typography>
            <TextField
              fullWidth
              placeholder="Cep:"
              {...register('cep')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>

          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <TextField
              fullWidth
              placeholder="Contato:"
              {...register('contato', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>

          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Fone
            </Typography>
            <TextField
              fullWidth
              placeholder="Fone:"
              {...register('fone')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 1,
            mt: -1,
            ...anim(100)
          }}
        >
          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              Fax
            </Typography>
            <TextField
              fullWidth
              placeholder="Fax:"
              {...register('fax')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>

          <Box sx={{ ...anim(300) }}>
            <Typography variant="h6" gutterBottom>
              País
            </Typography>
            <TextField
              fullWidth
              placeholder="Fax:"
              {...register('fax')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
              disabled
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

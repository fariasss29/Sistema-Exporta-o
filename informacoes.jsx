import React, { useState, useEffect } from 'react'
import BackdropLoading from '@/components/BackdropLoading'
import Error from '@/components/Error'
import axios from '@/services/axios'
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import { DatePicker } from '@mui/x-date-pickers-pro';

export default function InformacaoKzt({ methods, data }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const {
    register,
    control,
    setValue,
    formState: { errors }
  } = methods

  const onSubmit = (dados) => {
    const dataSelecionada = new Date(dados.data_visita);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
      toast.error('Data não pode ser anterior à hoje.');
      return;
    }

    const dataFormatada = formatDateLocal(dados.data_visita);

    setDadosEnvio({ ...dados, data_visita: dataFormatada });
    setOpenConfirmModal(true);
  };

  const clienteOptions = [
    { id: '1001', label: 'bora biu' },
    { id: '1002', label: 'fi do biu' },
    { id: '1003', label: 'mue do biu' }
  ]

  // helper para delay em ms
  const anim = (delay) => ({
    opacity: loaded ? 1 : 0.3,
    transform: loaded ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`
  })

  return (

    <Box
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
          <Box>
            <Typography variant="h6" gutterBottom>
              Nome *
            </Typography>
            <TextField
              fullWidth
              placeholder="Nome do remetente"
              {...register('nome_remetente', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.nome_remetente && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe o nome do remetente!
              </Alert>
            )}
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Data *
            </Typography>

            <Controller
              render={({ field }) => (
                <DatePicker
                  {...field}
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => field.onChange(date)}
                  value={field.value}
                  sx={{ width: "100%", borderRadius: 2 }}
                  minDate={new Date()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.data} 
                      helperText={errors.data ? errors.data.message : null}
                    />
                  )}
                />
              )}
              name="data"
              rules={{ required: 'Data é obrigatória' }}
              control={control}
            />

            {/* Exibe erro caso a data não seja preenchida */}
            {errors.data && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.data.message}
              </Alert>
            )}
          </Box>

        </Box>

        {/* ROW 2 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 3,
            mt: -2,
            ...anim(200)
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Departamento *
            </Typography>
            <TextField
              fullWidth
              placeholder="Depto"
              {...register('departamento_remetente', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.departamento_remetente && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe o departamento!
              </Alert>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Centro de Custo *
            </Typography>
            <TextField
              fullWidth
              placeholder="Centro de Custo"
              {...register('centro_custo', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                },
              }}
            />
            {errors.centro_custo && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Informe o centro de custo!
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

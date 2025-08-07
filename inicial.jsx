import React from 'react'
import { Box, Typography, Button, Chip, ButtonBase } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BsBoxSeam } from 'react-icons/bs'
import { MdCheckCircle } from 'react-icons/md'
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbBoxOff } from "react-icons/tb";
import { GrFormNextLink } from "react-icons/gr";
import { MdArrowForward } from 'react-icons/md';
import { styled } from '@mui/material/styles'

// 1) Defina a animação
const slide = {
  '0%': { transform: 'translateX(0)' },
  '50%': { transform: 'translateX(6px)' },
  '100%': { transform: 'translateX(0)' },
}

// 2) Crie um Button customizado
const AnimatedButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 8,
  padding: '12px 24px',
  fontSize: '1.2rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',

  // injeta a keyframes
  '@keyframes slideArrow': slide,

  // ao hover, dispara apenas na classe .arrowIcon
  '&:hover .arrowIcon': {
    animation: 'slideArrow 0.8s ease-in-out infinite',
  }
}))

export default function Inicial({ methods, onNext }) { // onNext é recebido como prop
  const navigate = useNavigate();


  const { setValue } = methods;


  const handleSelectNlag = () => {
    setValue('tipo_formulario', 'nlag');
    onNext();
  };

  const handleSelectPadrao = () => {
    setValue('tipo_formulario', 'padrao');
    onNext();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        py: 8,
        mt:-3,
        px: { xs: 2, md: 4 },
        position: 'relative'
      }}
    >
      {/* Título */}
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: 700, mb: 1 }}
      >
        Escolha seu Formulário{' '}
        <Box component="span" sx={{ color: 'primary.main' }}>
        </Box>
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4, fontSize: '1.5rem',  }}
      >
        Selecione o tipo de formulário mais adequado para sua necessidade de exportação
      </Typography>

      {/* Cards lado a lado */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >

        {/* -- Card 1 -- */}
        <Box
          component={ButtonBase}
          onClick={handleSelectNlag}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flex: '1 1 300px',
            width: '50%',
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 3,
            p: 0,
            overflow: 'hidden',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        >

          <Box
            sx={{
              width: '100%',
              position: 'absolute',
              top: 0,
              height: 8,
              background:
                'linear-gradient(90deg, #5cb8d4ff 0%, #000000ff 100%)',
            }}
          />
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Box sx={{
              mt: 4,
              width: "35%",
              height: '10vh',
              borderRadius: 2,
              background: 'rgba(79, 172, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TbBoxOff size={50} color="#4facfe" />
            </Box>

            <Typography variant="h5" sx={{ mt: 3, mb: 2, fontSize: '2.5rem' }}>
              Formulário Nlag
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, mb: 2, fontSize: '1.3rem' }}>
              Versão simplificada que remove campos adicionais do formulário padrão para material não estocável
            </Typography>

            {/* checks */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2, }}>
              {['Processo Rápido', 'Menos Campos'].map(label => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, }}>
                  <IoShieldCheckmarkSharp size={20} color="#4caf50" />
                  <Typography variant="caption" color="text.primary" sx={{ fontSize: '1rem' }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <AnimatedButton
              variant="contained"
              sx={{
                mt: 5,
                borderRadius: 4,

                padding: '12px 24px',
                backgroundColor: '#21262D',
                '&:hover': { backgroundColor: '#333842' }
              }}
              endIcon={
                <GrFormNextLink className="arrowIcon" size={20} />
              }
              onClick={handleSelectNlag - 1}
            >
              COMEÇAR AGORA
            </AnimatedButton>
          </Box>
        </Box>

        {/* -- Card 2 -- */}
        <Box
          component={ButtonBase}
          onClick={handleSelectPadrao}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flex: '1 1 300px',
            width: "50%",
            height: '60vh',
            bgcolor: '#fff',
            borderRadius: 3,
            boxShadow: 3,
            p: 0,
            overflow: 'hidden', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)', }
          }}
        >
          {/* borda degradê no topo */}
          <Box sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            height: 8,
            background: 'linear-gradient(90deg, #a70a0aff 0%, #ff8e53 100%)'
          }} />
          {/* selo RECOMENDADO */}
          {/* <Chip
            label="RECOMENDADO"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'linear-gradient(90deg, #fe6b8b 0%, #ff8e53 100%)',
              color: '#fff',
              fontWeight: 700
            }}
          /> */}

          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{
              width: "35%",
              height: '10vh',
              mt: 4,
              borderRadius: 2,
              background: 'rgba(254, 107, 139, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BsBoxSeam size={45} color="#fe6b8b" />
            </Box>

            <Typography variant="h5" sx={{ mt: 3, mb: 2, fontSize: '2.5rem' }}>
              Formulário Padrão
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, mb: 2, fontSize: '1.3rem' }}>
              Formulário completo com todos os campos necessários para exportação de material estocável
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 2, }}>
              {['completo', 'Detalhado', 'Material Estocável'].map(label => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, }}>
                  <IoShieldCheckmarkSharp size={20} color="#4caf50" />
                  <Typography variant="caption" color="text.primary" sx={{ fontSize: '1rem' }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <AnimatedButton
              variant="contained"
              sx={{
                mt: 5,
                borderRadius: 4,
                backgroundColor: '#21262D',
                '&:hover': { backgroundColor: '#333842' }
              }}
              endIcon={
                <GrFormNextLink className="arrowIcon" size={20} />
              }
              onClick={handleSelectPadrao - 1}
            >
              COMEÇAR AGORA
            </AnimatedButton>
          </Box>
        </Box>
      </Box>

      {/* caixinha de instrução embaixo */}
      <Box
        sx={{
          mt: 5,
          maxWidth: 430,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          py: 1.5,
          bgcolor: 'linear-gradient(135deg, #f9dcdc 0%, #f2b8b8 100%)',
          borderRadius: 5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          cursor: 'default',
        }}
      >
        <MdArrowForward size={28} color="#be0202bd" />
        <Typography variant="body1" sx={{ flex: 1, color: '#4f1f1f' }}>
          Selecione uma opção para continuar com sua exportação!
        </Typography>
      </Box>
    </Box>
  )
}

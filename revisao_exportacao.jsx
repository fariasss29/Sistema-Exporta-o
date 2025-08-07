// src/pages/exportacao/revisao_exportacao.jsx
import { Box, Typography, Button } from '@mui/material';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import Informacoes from './informacoes';
import FormularioRemessa from './formulario_remessa';
import CondicoesRemessa from './condicoes_remessa';
import Embalagem from '@/pages/exportacao/embalagem'
import Transporte from '@/pages/exportacao/transporte'
import MaterialExportacao from '@/pages/exportacao/material_exportacao'
import Estoque from '@/pages/exportacao/estoque'
import { buildExportacaoPdf } from './exportacao_pdf';
import { useNavigate } from 'react-router-dom';

export default function RevisaoExportacao({ methods }) {
  const { handleSubmit } = methods;
  const navigate = useNavigate();


  const gerarPdf = () => {
    handleSubmit(async (data) => {
      const blob = await buildExportacaoPdf(data);
      window.open(url, '_blank');
    })();
  };

  const handleEditClick = (tab) => {
    navigate(`/exportacao/formulario/${tab}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, minHeight: '75vh' }}>
      <Typography align="center" fontWeight="bold" variant="h4">
        Revisão Formulário
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados do Remetente
            </Typography>
          </Box>


          <Informacoes methods={methods} />
        </Box>

        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados do Destinatário
            </Typography>
          </Box>
          <FormularioRemessa methods={methods} />
        </Box>

        
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados da Remessa
            </Typography>
          </Box>
        <CondicoesRemessa methods={methods} />
        </Box>
        
          <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados do Material
            </Typography>
          </Box>
        <MaterialExportacao methods={methods} />
        </Box>

          <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados da Embalagem
            </Typography>
          </Box>
        <Embalagem methods={methods} />
        </Box>


        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados do Embarque
            </Typography>
          </Box>
        <Transporte methods={methods} />
        </Box>

        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 3,
            py: 2,
            position: 'relative',
            borderLeft: '4px solid #0000008f',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Dados do Estoque
            </Typography>
          </Box>
        <Estoque methods={methods} />
        </Box>



        {/* <Button
          type="button"
          onClick={gerarPdf}
          variant="contained"
          sx={{
            bgcolor: '#276cdb',
            height: 50,
            width: '100%',
            gap: 1,
            '&:hover': { bgcolor: '#48A5EA' }
          }}
        >
          <Typography fontSize={16} fontWeight={700}>
            Criar Formulário de Exportação
          </Typography>
          <MdOutlineWorkspacePremium size={25} />
        </Button> */}
      </Box>
    </Box>
  );
}

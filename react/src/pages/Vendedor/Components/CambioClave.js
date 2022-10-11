import {Card, CardContent, Grid, Typography, TextField, Button, CircularProgress} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const CambioClave = ({idUser}) => {

    const [clave, setClave] = useState({
        clave:'',
      })
    
      const [loading, setLoading] = useState(false);
    
      const navigate = useNavigate();
    
      const handleChange = e => {
        console.log(clave)
        setClave({...clave, [e.target.name]: e.target.value})
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        const res = await fetch(`http://localhost:4000/cambioClave/${idUser}`, {
          method: 'PUT',
          headers: {"Content-Type": "application/json" },
          body: JSON.stringify(clave),
        });
        const data = await res.json();
        console.log(data);
        
        setLoading(false);
        navigate('/');
      };

    return(
        <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{
          backgroundColor: "#1e272e",
          padding: "1rem",
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            Cambiar Clave
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>

              <TextField 
                variant='filled' 
                placeholder='Ingrese Clave Nueva' 
                label='Clave'
                sx={{
                  display:'block',
                  margin:'.10rem 0'
                }}
                
                name='clave'
                onChange={handleChange}
                inputProps={{ style: {color:"white"} }}
                InputLabelProps={{ style: {color:"white"} }}
              />

              <Button variant='contained' color='warning' type='submit' disabled={ !clave.clave || clave.clave.length<=3 } >
                { loading ? (
                  <CircularProgress color='inherit' size={24} /> 
                  ) : (
                    "Cambiar"
                  )}
              </Button>

            </form>
          </CardContent>
        </Card>

      </Grid>
    </Grid>
    )
}
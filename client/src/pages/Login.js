
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material'



const theme = createTheme();
  


 function Login() {
    const [formData, setFormData] = useState({
       
        email: '',
        password: '',
       
    })

    const [validate, setValidate] = useState("false")

    const { email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth);


    useEffect(() => {
        if(isError) {
            alert(message);
        }
        if(isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());

    },[user, isError, isSuccess, message, navigate, dispatch]);


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    const onChange = (e) =>
     setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if(email === '' || password === ''){
          
            setValidate("true")
            setTimeout(() => {
                setValidate("false")
            }, 4000);
            return false;
        

        }
         if(!emailPattern.test(email)){
            alert("Please enter a valid email")
            return false;
        }

        else{

        const userData = {
            email,
            password
        }
        dispatch(login(userData));
    }

          
    }


    if(isLoading){
        return <Spinner />
    }



   return (
     <div>
         


            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
             {validate === "true" ? <Alert style={{ marginBottom: "10px" }}severity="error">Please Enter All Fields</Alert> 
                : null}
            <Grid container spacing={2}>

               
               
         

              

            
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                    onChange={onChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                    onChange={onChange}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>

            

     </div>
   )
 }
 
 export default Login
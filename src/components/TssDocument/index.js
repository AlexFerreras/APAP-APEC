import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import post from '../../services/post'
import LinearIndeterminate from '../Loading'

const title = {
  color: 'black'
}

const mt15 = {
  marginTop: 15,
}

const alignBtnSend = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const TssDocument = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [moneda, setMoneda] = React.useState('DOP')

  const { register, handleSubmit, errors } = useForm();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleChangeMoneda = (event) => {
    setMoneda(event.target.value);
  };

  async function onSubmit(data) {
    data = {
      ...data,
      fecha: selectedDate,
      moneda: moneda
    }
    setIsLoading(true)
    const response = await post('empleados/generar-archivo', data)
    setIsLoading(false)
    createFile(response)
  }

  function createFile(data) {
    const element = document.createElement("a")
    const file = new Blob([atob(data)], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "tss.txt"
    document.body.appendChild(element)
    element.click()
  } 
  
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <span style={title}> 
          Descargar documento <strong> TSS </strong>
        </span>
      </Typography>

      { isLoading && <LinearIndeterminate /> }
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={mt15}>
          <Grid item xs={6}>
            <TextField
              name="rnc"
              error={errors.rnc ? true : false}
              helperText={errors.rnc && errors.rnc.message}
              inputRef={register({required: "El RNC es obligatorio", 
                minLength: {value: 13, message: "La longitud mínima debe ser igual a 13"}, 
                maxLength: {value: 13, message: "La longitud máxima debe ser igual a 13"}})}
              fullWidth 
              type="text"
              label="RNC*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Fecha*"
                size="small"
                format="dd/MM/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={date => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid> 
          <Grid item xs={12}>
            <FormControl size="small" variant="outlined" >
              <InputLabel htmlFor="outlined-age-native-simple">Moneda</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={moneda}
                onChange={handleChangeMoneda}
                label="Moneda"
              >
                <MenuItem value={'DOP'}>DOP</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid item xs={12}>
            <div style={alignBtnSend}>
              <Button type="submit" variant="contained" color="primary">
                Descargar documento &nbsp; <CloudDownloadIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
  
export default TssDocument;
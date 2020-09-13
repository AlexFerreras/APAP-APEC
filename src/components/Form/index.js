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
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Form = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [documentType, setdocumentType] = React.useState(1)
  const [moneda, setMoneda] = React.useState(1)

  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles()

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChangeDocumentType = (event) => {
    setdocumentType(event.target.value);
  };
  const handleChangeMoneda = (event) => {
    setMoneda(event.target.value);
  };

  const onSubmit = (data) => {
    data = {
      ...data,
      fecha: selectedDate,
      tipoDocumento: documentType,
      moneda: moneda
    }
    console.log(data);
  }
  
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <span style={title}> 
          Información requerida por la <strong> TSS </strong>
        </span>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={mt15}>
          <Grid item xs={12}>
            <TextField
              name="nombre"
              error={errors.nombre ? true : false}
              helperText={errors.nombre && errors.nombre.message}
              inputRef={register({required: "El nombre es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 40, message: "La longitud máxima debe ser igual a 40"}})}
              fullWidth 
              type="text"
              label="Nombre del empleado*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Tipo de documento</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={documentType}
                onChange={handleChangeDocumentType}
                label="Tipo de documento"
              >
                <MenuItem value={1}>Cédula</MenuItem>
                <MenuItem value={2}>Pasaporte</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="documento"
              error={errors.documento ? true : false}
              helperText={errors.documento && errors.documento.message}
              inputRef={register({required: "El documento es obligatorio", 
                minLength: {value: 11, message: "La longitud mínima debe ser igual a 11"}, 
                maxLength: {value: 11, message: "La longitud máxima debe ser igual a 11"}})}
              fullWidth 
              type="text"
              label="Documento*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Moneda</InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={moneda}
                onChange={handleChangeMoneda}
                label="Moneda"
              >
                <MenuItem value={1}>DOP</MenuItem>
                <MenuItem value={2}>USD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="salarioCotizable"
              error={errors.salarioCotizable ? true : false}
              helperText={errors.salarioCotizable && errors.salarioCotizable.message}
              inputRef={register({required: "El salario cotizable es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 16, message: "La longitud máxima debe ser igual a 16"},
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos"
                }})}
              fullWidth 
              type="number"
              label="Salario cotizable*"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              name="aporteVoluntario"
              error={errors.aporteVoluntario ? true : false}
              helperText={errors.aporteVoluntario && errors.aporteVoluntario.message}
              inputRef={register({required: "El aporte voluntario es obligatorio", 
                minLength: {value: 1, message: "La longitud mínima debe ser igual a 1"}, 
                maxLength: {value: 16, message: "La longitud máxima debe ser igual a 16"},
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos"
                }})}
              fullWidth 
              type="number"
              label="Aporte voluntario*"
              variant="outlined"
              size="small"
            />
          </Grid>
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
            <div style={alignBtnSend}>
              <Button type="submit" variant="contained" color="primary">
                Enviar datos
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
  
export default Form;
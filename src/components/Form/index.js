import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import validateDominicanId from "validacion-cedula-dominicana";
import post from "../../services/post";
import LinearIndeterminate from "../Loading";

const title = {
  color: "black",
};

const mt15 = {
  marginTop: 15,
};

const alignBtnSend = {
  display: "flex",
  justifyContent: "flex-end",
};

const Form = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [documentType, setdocumentType] = React.useState("Cedula");
  const [accountType, setaccountType] = React.useState("Ahorro");
  const { register, handleSubmit, errors } = useForm();

  const handleChangeDocumentType = (event) => {
    setdocumentType(event.target.value);
  };

  async function onSubmit(data) {
    data = {
      ...data,
      tipoDocumento: documentType,
      tipocuenta: accountType,
    };
    data.sueldo = Number(data.sueldo);
    setIsLoading(true);
    console.log(JSON.stringify(data, null, 2));
    await post("empleados", data);
    setIsLoading(false);
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <span style={title}>Guardar empleado</span>
      </Typography>

      {isLoading && <LinearIndeterminate />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={mt15}>
          <Grid item xs={6}>
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Tipo de documento
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={documentType}
                onChange={handleChangeDocumentType}
                label="Tipo de documento"
              >
                <MenuItem value={"Cedula"}>Cédula</MenuItem>
                <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {documentType === "Cedula" ? (
              <TextField
                name="documento"
                error={errors.documento ? true : false}
                helperText={errors.documento && errors.documento.message}
                inputRef={register({
                  required: "La cédula es obligatoria",
                  minLength: {
                    value: 11,
                    message: "La longitud mínima debe ser igual a 11",
                  },
                  maxLength: {
                    value: 11,
                    message: "La longitud máxima debe ser igual a 11",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Solo se adminten números positivos",
                  },
                  validate: validateDominicanId,
                })}
                fullWidth
                type="text"
                label="Introduzca la cédula*"
                variant="outlined"
                size="small"
              />
            ) : (
              <TextField
                name="documento"
                error={errors.documento ? true : false}
                helperText={errors.documento && errors.documento.message}
                inputRef={register({
                  required: "El documento es obligatorio",
                  minLength: {
                    value: 11,
                    message: "La longitud mínima debe ser igual a 11",
                  },
                  maxLength: {
                    value: 11,
                    message: "La longitud máxima debe ser igual a 11",
                  },
                })}
                fullWidth
                type="text"
                label="Introduzca el pasaporte*"
                variant="outlined"
                size="small"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="numerocuenta"
              error={errors.numerocuenta ? true : false}
              helperText={errors.numerocuenta && errors.numerocuenta.message}
              inputRef={register({
                required: "El Numero de Cuenta es obligatorio",
                minLength: {
                  value: 9,
                  message: "La longitud mínima debe ser igual a 9",
                },
                maxLength: {
                  value: 11,
                  message: "La longitud máxima debe ser igual a 11",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se adminten números positivos",
                },
              })}
              fullWidth
              type="text"
              label="Numero de Cuenta del empleado*"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl size="small" variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Tipo de Cuenta
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={accountType}
                onChange={(e) => setaccountType(e.target.value)}
                label="Tipo de Cuenta"
              >
                <MenuItem value={"Ahorro"}>ahorro</MenuItem>
                <MenuItem value={"Corriente"}>Corriente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="sueldo"
              error={errors.sueldo ? true : false}
              helperText={errors.sueldo && errors.sueldo.message}
              inputRef={register({
                required: "El Sueldo es obligatorio",
                minLength: {
                  value: 1,
                  message: "La longitud mínima debe ser igual a 1",
                },
                maxLength: {
                  value: 24,
                  message: "La longitud máxima debe ser igual a 24",
                },
              })}
              fullWidth
              type="number"
              label="Sueldo*"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <div style={alignBtnSend}>
              <Button type="submit" variant="contained" color="primary">
                Guardar datos &nbsp; <CloudUploadIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;

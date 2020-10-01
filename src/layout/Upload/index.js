import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Dropzone from "../../components/Dropzone";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import post from "../../services/post";
import LinearIndeterminate from "../../components/Loading";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const textarea = {
  width: "100%",
  height: "200px",
  overflow: "hidden",
};

const alignBtnSend = {
  display: "flex",
  justifyContent: "flex-end",
};

const Upload = () => {
  const [base64, setBase64] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const addBase64 = (base64) => {
    setBase64(base64);
  };

  async function sendData() {
    setIsLoading(true);
    await post("/empleados/leer-archivo", { data: base64 });
    setIsLoading(false);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Dropzone addBase64={addBase64} />
        </Grid>
        <Grid item xs={12}>
          {base64 !== "" ? (
            <div>
              <h2> El contenido de tu file es: </h2>
              <TextareaAutosize
                style={textarea}
                rowsMax={10}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue={atob(base64)}
              />

              {isLoading && (
                <div>
                  <br />
                  <LinearIndeterminate />
                </div>
              )}
              <br />
              <div style={alignBtnSend}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    sendData();
                  }}
                >
                  Guardar datos &nbsp; <CloudUploadIcon />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h1>
                {" "}
                No se ha seleccionado ningún archivo{" "}
                <span role="img" aria-label="crying emoji">
                  😥
                </span>{" "}
              </h1>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Upload;

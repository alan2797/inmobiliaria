import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { SAVE, BACK } from "constants/index";
import { Button, FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import { formSchema } from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";
import Divider from "@material-ui/core/Divider";

const ProveedorCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.values);
    const body = {
      proveedor: formState.values,
    };
    console.log(body);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/proveedor",
        formState.values
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  return (
    <div className={className.root}>
      <Card className={className.root} style={{ marginBottom: 10 }}>
        <CardHeader title="Registro de Proveedor" />
        <Divider />
        <CardContent>
          <Grid container direction="row" spacing={4}>
            {Object.keys(formSchema).map((key) => (
              <Grid item md={6}>
                <FormInput
                  key={key}
                  name={key}
                  label={formSchema[key].label}
                  value={formState.values[key]}
                  helperText={
                    hasError(key)
                      ? formState.errors[key][0]
                      : formSchema[key].helperText
                  }
                  error={hasError(key)}
                  onChange={handleChange}
                  type={formSchema[key].type}
                  shrink={formSchema[key].shrink}
                  opciones={formSchema[key].opciones}
                  select={formSchema[key].select}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Button
        color="primary"
        className={className.button}
        disabled={!formState.isValid}
        size="large"
        // type="submit"
        onClick={handleSubmit}
        variant="contained"
        title={SAVE}
      />
      <Button
        color="inherit"
        size="large"
        variant="contained"
        onClick={() => history.goBack()}
        title={BACK}
      />
    </div>
  );
};

ProveedorCreate.propTypes = {
  history: PropTypes.object,
};

export default ProveedorCreate;

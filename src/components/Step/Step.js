import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

export const StepperComponent = (props) => {
  const classes = useStyles();
  const {
    activeStep,
    onClickSiguiente,
    onClickAnterior,
    steppersContent,
    onClickReset,
    nombreSteps,
  } = props;
  if (!nombreSteps) return "Algo esta mal";
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {nombreSteps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{steppersContent[activeStep]}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={onClickAnterior}
                    className={classes.button}
                    variant="contained"
                  >
                    Atras
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickSiguiente}
                    className={classes.button}
                  >
                    {activeStep === nombreSteps.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === nombreSteps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Todos los pasos fueron completados.</Typography>
          <Button onClick={onClickReset} className={classes.button}>
            Volver a empezar
          </Button>
        </Paper>
      )}
    </div>
  );
};

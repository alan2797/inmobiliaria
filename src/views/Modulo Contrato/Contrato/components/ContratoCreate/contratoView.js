import React from "react";
import { Grid, Paper } from "@material-ui/core";
const labelStyle = { fontWeight: "bold", textTransform: "uppercase" };
const ContratoView = (props) => {
  console.log(props);
  const { duracion, inmueble, propietario, inquilino, extra } = props;
  return (
    <Grid container direction="row">
      <Grid item md={12} sm={12}>
        <Paper style={{ padding: 40, paddingRight: 100, paddingLeft: 100 }}>
          <center>
            <h2>CONTRATO ALQUILER</h2>
          </center>
          <br />
          <br />
          <br />
          <p style={{ fontSize: 17 }}>
            Conste por el presente documento privado de contrato de ALQUILER,
            que el mismo a solo reconocimiento de firmas y rúbricas entre partes
            suscribientes se podrá elevar a documento público; el mismo que es
            suscrito bajo las siguientes cláusulas:
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            PRIMERA.- (PROPIETARIO) Yo;{" "}
            <label style={labelStyle}>
              {propietario.nombre + " " + propietario.apellido}
            </label>{" "}
            con C.I.
            <label style={labelStyle}>{propietario.ci}</label>, mayor de edad y
            hábil por derecho, boliviano, al presente declaro ser legítimo
            propietario de un bien inmueble ubicado en la{" "}
            <label style={labelStyle}>
              {inmueble.zona} de la ciudad de {inmueble.ciudad}, Nº{" "}
              {inmueble.numero}:{" "}
            </label>
            , inmueble que está debidamente registrado en la Oficina de Derechos
            Reales.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            SEGUNDA.- (OBJETO), Al presente, por convenir a mis intereses, de mi
            libre y espontanea voluntad, DOY, en contrato de alquiler{" "}
            <label style={labelStyle}>UNA {extra.tipo}</label> , del inmueble
            señalado en la cláusula primera, con servicio energía eléctrica, a
            favor de los señores:{" "}
            <label style={labelStyle}>
              {inquilino.nombre + " " + inquilino.apellido}
            </label>{" "}
            con C.I. <label style={labelStyle}>{inquilino.ci}</label>, por
            acuerdo de partes el canon del alquiler es por la suma de{" "}
            <label style={labelStyle}>{duracion.moneda}</label>
            <label style={labelStyle}>{duracion.monto}.-</label>
            <label style={labelStyle}>{duracion.entrega_pago}</label>.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            TERCERA.- FORMA DE PAGO.- El inquilino cancelará por concepto del
            canon de alquiler{" "}
            <label style={labelStyle}>{duracion.entrega_pago}</label>, al mes
            cumplido.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            CUARTA.- PLAZO.- Por acuerdo libre de partes el contrato tendrá
            duración de <label style={labelStyle}>4 años</label>, computable
            desde fecha
            <label style={labelStyle}>{duracion.fecha_inicio}</label> , contrato
            que se podrá renovar por acuerdo de partes, en consecuencia a la
            finalización del presente contrato los inquilinos devolverán al
            propietario el objeto del presente contrato en las mismas
            condiciones que reciben.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            QUINTA.- El inquilino, se comprometen a cuidar y conservar en buen
            estado los ambientes que recibe en calidad de alquiler; para el pago
            de servicio de luz será cancelado por el inquilino a prorrata es
            decir conjuntamente con otros ocupantes del inmueble de acuerdo a la
            factura del servicio. Por otro parte, el inquilino es responsable de
            cualquier destrucción o deterioro que pudiera producirse durante la
            vigencia del contrato, salvo aquellos que por desgaste normal o por
            uso corriente que se hubieran producido.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            SEXTA (USO Y DEVOLUCIÓN).- El inquilino recibe para uso de
            <label style={labelStyle}>{extra.tipo}</label> quedando prohibido
            darle otro uso, o sub alquilar a terceras personas bajo alternativa
            de resolución de contrato.
          </p>
          <br />
          <p style={{ fontSize: 17 }}>
            SEPTIMA .- Yo, por un lado{" "}
            <label style={labelStyle}>
              {propietario.nombre + " " + propietario.apellido}
            </label>{" "}
            como propietario, y por otra parte{" "}
            <label style={labelStyle}>
              {inquilino.nombre + " " + inquilino.apellido}
            </label>{" "}
            en calidad de inquilino, declaramos nuestra plena conformidad a cada
            una de las cláusulas estipuladas en el presente documento, por lo
            que firmamos al pie del mismo.
          </p>
        </Paper>{" "}
      </Grid>
    </Grid>
  );
};
export { ContratoView };

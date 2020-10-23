import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Page, Text, View, Document, StyleSheet,PDFViewer ,PDFDownloadLink } from '@react-pdf/renderer';
const labelStyle = { fontWeight: "bold", textTransform: "uppercase" };
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieContainer: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },   
    title: {
    fontSize: 24,
    textAlign: 'center',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
      },
      text2 :{
        fontWeight:'bold',
        textTransform:'uppercase'
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
  });
const ContratoDocPdf = (props) => {
  console.log("DOC PDF ",props);
  const { duracion, inmueble, propietario, inquilino, extra } = props;
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>CONTRATO DE ALQUILER</Text>
        <Text style={styles.text}>
            Conste por el presente documento privado de contrato de ALQUILER,
            que el mismo a solo reconocimiento de firmas y rúbricas entre partes
            suscribientes se podrá elevar a documento público; el mismo que es
            suscrito bajo las siguientes cláusulas:
        </Text>
        <Text style={styles.text}>
             PRIMERA.- (PROPIETARIO) Yo;{" "}
            <Text style={styles.text2}>
              {propietario.nombre + " " + propietario.apellido}
            </Text>{" "}
            con C.I. {" "}
            <Text style={styles.text2}>{propietario.ci}</Text>, mayor de edad y
            hábil por derecho, boliviano, al presente declaro ser legítimo
            propietario de un bien inmueble ubicado en la{" "}
            <Text style={styles.text2}>
              {inmueble.zona} de la ciudad de {inmueble.ciudad}, Nº{" "}
              {inmueble.numero}:{" "}
            </Text>
            , inmueble que está debidamente registrado en la Oficina de Derechos
            Reales.
        </Text>
        <Text style={styles.text}>
            SEGUNDA.- (OBJETO), Al presente, por convenir a mis intereses, de mi
            libre y espontanea voluntad, DOY, en contrato de alquiler{" "}
            <Text style={styles.text2}>UNA {extra.tipo}</Text> , del inmueble
            señalado en la cláusula primera, con servicio energía eléctrica, a
            favor de los señores:{" "}
            <Text style={styles.text2}>
              {inquilino.nombre + " " + inquilino.apellido}
            </Text>{" "}
            con C.I. <Text style={styles.text2}>{inquilino.ci}</Text>, por
            acuerdo de partes el canon del alquiler es por la suma de{" "}
            <Text style={styles.text2}>{duracion.moneda}</Text>{" "}
            <Text style={styles.text2}>{duracion.monto}.-</Text>{" "}
            <Text style={styles.text2}>{duracion.entrega_pago}</Text>.
        </Text>
        <Text style={styles.text}>
            TERCERA.- FORMA DE PAGO.- El inquilino cancelará por concepto del
            canon de alquiler{" "}
            <Text style={styles.text2}>{duracion.entrega_pago}</Text>, al mes
            cumplido.
        </Text>
        <Text style={styles.text}>
            CUARTA.- PLAZO.- Por acuerdo libre de partes el contrato tendrá
            duración de <Text style={styles.text2}>2 años</Text>, computable
            desde fecha {" "}
            <Text style={styles.text2}>{duracion.fecha_inicio}</Text> , contrato
            que se podrá renovar por acuerdo de partes, en consecuencia a la
            finalización del presente contrato los inquilinos devolverán al
            propietario el objeto del presente contrato en las mismas
            condiciones que reciben.
        </Text>
        <Text style={styles.text}>
            QUINTA.- El inquilino, se comprometen a cuidar y conservar en buen
            estado los ambientes que recibe en calidad de alquiler; para el pago
            de servicio de luz será cancelado por el inquilino a prorrata es
            decir conjuntamente con otros ocupantes del inmueble de acuerdo a la
            factura del servicio. Por otro parte, el inquilino es responsable de
            cualquier destrucción o deterioro que pudiera producirse durante la
            vigencia del contrato, salvo aquellos que por desgaste normal o por
            uso corriente que se hubieran producido.
        </Text>
        <Text style={styles.text}>
            SEXTA (USO Y DEVOLUCIÓN).- El inquilino recibe para uso de
            <Text style={styles.text2}>{extra.tipo}</Text> quedando prohibido
            darle otro uso, o sub alquilar a terceras personas bajo alternativa
            de resolución de contrato.
        </Text>
        <Text style={styles.text}>
            SEPTIMA .- Yo, por un lado{" "}
            <Text style={styles.text2}>
              {propietario.nombre + " " + propietario.apellido}
            </Text>{" "}
            como propietario, y por otra parte{" "}
            <Text style={styles.text2}>
              {inquilino.nombre + " " + inquilino.apellido}
            </Text>{" "}
            en calidad de inquilino, declaramos nuestra plena conformidad a cada
            una de las cláusulas estipuladas en el presente documento, por lo
            que firmamos al pie del mismo.
        </Text>
      </Page >
    </Document>
  );
};
export { ContratoDocPdf };

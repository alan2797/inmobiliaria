const formSchema = {
  observacion: {
    label: "Observacion *",
    type: "text",
  },
  estado: {
    label: 'Estado *',
    type: 'select',
    options: [
      { value: 'en espera', label: 'En espera'},
      { value: 'en proceso', label: 'En proceso'},
      { value: 'anulado', label: 'Anulado'},
      { value: 'entregado', label: 'Entregado'},
    ],
    select: true,
  },
};
export default formSchema;

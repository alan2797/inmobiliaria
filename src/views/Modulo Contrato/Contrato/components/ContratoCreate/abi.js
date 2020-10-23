export const abiContrato = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "contratosData",
    "outputs": [
      {
        "name": "fecha_inicio",
        "type": "string"
      },
      {
        "name": "fecha_final",
        "type": "string"
      },
      {
        "name": "tipo_pago",
        "type": "string"
      },
      {
        "name": "tipo",
        "type": "string"
      },
      {
        "name": "entrega_pago",
        "type": "string"
      },
      {
        "name": "valor",
        "type": "uint256"
      },
      {
        "name": "moneda",
        "type": "string"
      },
      {
        "name": "estado",
        "type": "string"
      },
      {
        "name": "inmueble",
        "type": "uint256"
      },
      {
        "name": "propietario",
        "type": "uint256"
      },
      {
        "name": "cliente",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "fecha_inicio",
        "type": "string"
      },
      {
        "name": "fecha_final",
        "type": "string"
      },
      {
        "name": "tipo_pago",
        "type": "string"
      },
      {
        "name": "tipo",
        "type": "string"
      },
      {
        "name": "entrega_pago",
        "type": "string"
      },
      {
        "name": "valor",
        "type": "uint256"
      },
      {
        "name": "moneda",
        "type": "string"
      },
      {
        "name": "estado",
        "type": "string"
      },
      {
        "name": "inmueble",
        "type": "uint256"
      },
      {
        "name": "propietario",
        "type": "uint256"
      },
      {
        "name": "cliente",
        "type": "uint256"
      }
    ],
    "name": "setContrato",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getContratos",
    "outputs": [
      {
        "components": [
          {
            "name": "fecha_inicio",
            "type": "string"
          },
          {
            "name": "fecha_final",
            "type": "string"
          },
          {
            "name": "tipo_pago",
            "type": "string"
          },
          {
            "name": "tipo",
            "type": "string"
          },
          {
            "name": "entrega_pago",
            "type": "string"
          },
          {
            "name": "valor",
            "type": "uint256"
          },
          {
            "name": "moneda",
            "type": "string"
          },
          {
            "name": "estado",
            "type": "string"
          },
          {
            "name": "inmueble",
            "type": "uint256"
          },
          {
            "name": "propietario",
            "type": "uint256"
          },
          {
            "name": "cliente",
            "type": "uint256"
          }
        ],
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

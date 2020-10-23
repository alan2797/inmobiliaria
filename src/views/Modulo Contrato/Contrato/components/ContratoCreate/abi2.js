export const abiContrato2 =[
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
          "name": "tipo",
          "type": "string"
        },
        {
          "name": "duracion",
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
          "name": "fecha_firma",
          "type": "string"
        },
        {
          "name": "fecha_vencimiento",
          "type": "string"
        },
        {
          "name": "cliente",
          "type": "string"
        },
        {
          "name": "inmueble",
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
          "name": "tipo",
          "type": "string"
        },
        {
          "name": "duracion",
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
          "name": "fecha_firma",
          "type": "string"
        },
        {
          "name": "fecha_vencimiento",
          "type": "string"
        },
        {
          "name": "cliente",
          "type": "string"
        },
        {
          "name": "inmueble",
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
              "name": "tipo",
              "type": "string"
            },
            {
              "name": "duracion",
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
              "name": "fecha_firma",
              "type": "string"
            },
            {
              "name": "fecha_vencimiento",
              "type": "string"
            },
            {
              "name": "cliente",
              "type": "string"
            },
            {
              "name": "inmueble",
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
interface IUpdateFarmDTO {
  id: number;
  idProducer: number;
  idProduct: number;
  nome: string;
  cnpj: string;
  cidade: string;
  estado: string;
  total_area: number;
  produceble_area: number;
  vegetation_area: number;
}

export { IUpdateFarmDTO };

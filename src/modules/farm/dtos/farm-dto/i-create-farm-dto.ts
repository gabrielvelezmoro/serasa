interface ICreateFarmDTO {
  idProducer: number;
  nome: string;
  cidade: string;
  estado: string;
  total_area: number;
  produceble_area: number;
  vegetation_area: number;
}

export { ICreateFarmDTO };

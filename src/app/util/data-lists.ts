export interface Ciudades {
    value : string;
    text: string;
}

export interface TiposDocumento {
    value : string;
    text : string;
}

export interface PeriodoPublicacion {
    value : string;
    text : string;
    selector : string;
}

export interface Sexos {
    value : string;
    text : string;
    selector: string;
}

export interface Tempresa {
    value : string;
    text : string;
}

export interface TipoPostulacion {
    value : string;
    text : string;
}

export interface Publicacion {
    value : string;
    text : string;
}

export interface Remoto {
    value : string;
    text : string;
}

export interface Experiencia {
    value : string;
    text : string;
    selector : string;
}

export interface Categorias {
    value: string;
    text: string;
}

export const Ciudades: Ciudades[] = [
    { value: 'Bagua Grande', text: 'Bagua Grande' },
    { value: 'Chachapoyas', text: 'Chachapoyas' },
    { value: 'Bagua', text: 'Bagua' },
    { value: 'Chimbote', text: 'Chimbote' },
    { value: 'Huaraz', text: 'Huaraz' },
    { value: 'Huarmey', text: 'Huarmey' },
    { value: 'Casma', text: 'Casma' },
    { value: 'Caraz', text: 'Caraz' },
    { value: 'Abancay', text: 'Abancay' },
    { value: 'Andahuaylas', text: 'Andahuaylas' },
    { value: 'Arequipa', text: 'Arequipa' },
    { value: 'Camaná', text: 'Camaná' },
    { value: 'Mollendo', text: 'Mollendo' },
    { value: 'Mejía', text: 'Mejía' },
    { value: 'Majes', text: 'Majes' },
    { value: 'Ayacucho', text: 'Ayacucho' },
    { value: 'Huanta', text: 'Huanta' },
    { value: 'Puquio', text: 'Puquio' },
    { value: 'Cora Cora', text: 'Cora Cora' },
    { value: 'San Miguel', text: 'San Miguel' },
    { value: 'Vilcashuamán', text: 'Vilcashuamán' },
    { value: 'Cangallo', text: 'Cangallo' },
    { value: 'Cajamarca', text: 'Cajamarca' },
    { value: 'Jaén', text: 'Jaén' },
    { value: 'Cutervo', text: 'Cutervo' },
    { value: 'Chota', text: 'Chota' },
    { value: 'Celendín', text: 'Celendín' },
    { value: 'Cajabamba', text: 'Cajabamba' },
    { value: 'Bambamarca', text: 'Bambamarca' },
    { value: 'San Ignacio', text: 'San Ignacio' },
    { value: 'Callao', text: 'Callao' },
    { value: 'Cusco', text: 'Cusco' },
    { value: 'Sicuani', text: 'Sicuani' },
    { value: 'Quillabamba', text: 'Quillabamba' },
    { value: 'Espinar', text: 'Espinar' },
    { value: 'Huancavelica', text: 'Huancavelica' },
    { value: 'Huánuco', text: 'Huánuco' },
    { value: 'Tingo María', text: 'Tingo María' },
    { value: 'Ica', text: 'Ica' },
    { value: 'Chincha Alta', text: 'Chincha Alta' },
    { value: 'Pisco', text: 'Pisco' },
    { value: 'Nasca', text: 'Nasca' },
    { value: 'Huancayo', text: 'Huancayo' },
    { value: 'Tarma', text: 'Tarma' },
    { value: 'Jauja', text: 'Jauja' },
    { value: 'La Oroya', text: 'La Oroya' },
    { value: 'Trujillo', text: 'Trujillo' },
    { value: 'Chepén', text: 'Chepén' },
    { value: 'Pacasmayo', text: 'Pacasmayo' },
    { value: 'Guadalupe', text: 'Guadalupe' },
    { value: 'Casa Grande', text: 'Casa Grande' },
    { value: 'Chiclayo', text: 'Chiclayo' },
    { value: 'Lambayeque', text: 'Lambayeque' },
    { value: 'Ferreñafe', text: 'Ferreñafe' },
    { value: 'Monsefú', text: 'Monsefú' },
    { value: 'Lima', text: 'Lima' },
    { value: 'Huacho', text: 'Huacho' },
    { value: 'Huaral', text: 'Huaral' },
    { value: 'Cañete', text: 'Cañete' },
    { value: 'Barranca', text: 'Barranca' },
    { value: 'Chancay', text: 'Chancay' },
    { value: 'Paramonga', text: 'Paramonga' },
    { value: 'Iquitos', text: 'Iquitos' },
    { value: 'Yurimaguas', text: 'Yurimaguas' },
    { value: 'Requena', text: 'Requena' },
    { value: 'Puerto Maldonado', text: 'Puerto Maldonado' },
    { value: 'Moquegua', text: 'Moquegua' },
    { value: 'Ilo', text: 'Ilo' },
    { value: 'Cerro de Pasco', text: 'Cerro de Pasco' },
    { value: 'Oxapampa', text: 'Oxapampa' },
    { value: 'Piura', text: 'Piura' },
    { value: 'Sullana', text: 'Sullana' },
    { value: 'Paita', text: 'Paita' },
    { value: 'Talara', text: 'Talara' },
    { value: 'Catacaos', text: 'Catacaos' },
    { value: 'Chulucanas', text: 'Chulucanas' },
    { value: 'Sechura', text: 'Sechura' },
    { value: 'Juliaca', text: 'Juliaca' },
    { value: 'Puno', text: 'Puno' },
    { value: 'Azángaro', text: 'Azángaro' },
    { value: 'Ilave', text: 'Ilave' },
    { value: 'Tarapoto', text: 'Tarapoto' },
    { value: 'Moyobamba', text: 'Moyobamba' },
    { value: 'Juanjuí', text: 'Juanjuí' },
    { value: 'Rioja', text: 'Rioja' },
    { value: 'Tacna', text: 'Tacna' },
    { value: 'Tumbes', text: 'Tumbes' },
    { value: 'Zarumilla', text: 'Zarumilla' },
    { value: 'Pucallpa', text: 'Pucallpa' }
]

export const TiposDocumento: TiposDocumento[] = [
    { value: 'DNI ', text: 'DNI - Documento Nacional de Identidad' },
    { value: 'CE', text: 'CE - Carné de Extranjería' },
    { value: 'Pasaporte', text: 'Pasaporte' }
]


export const Sexos: Sexos[] = [
    { value: 'Femenino', text: 'Femenino', selector: 'femenin' },
    { value: 'Masculino', text: 'Masculino', selector: 'mascul' },
  //no contemplado  { value: 'Otros', text: 'Otros' }
]

//en minuscula se muestra repetido
export const Tempresa: Tempresa[] = [
    { value: '1 a 5 Empleados', text: '1 a 5 Empleados' },
    { value: '5 a 20 Empleados', text: '5 a 20 Empleados' },
    { value: '20 a 100 Empleados', text: '20 a 100 Empleados'},
    { value: '100 a mas Empleados', text: '100 a mas Empleados'}

]

export const Categorias: Categorias[] = [
    { value: 'Marketing Digital', text: 'Marketing Digital' },
    { value: 'Sistemas de Información & Software', text: 'Sistemas de Información & Software' },
    { value: 'Ingeniería', text: 'Ingeniería' },
    { value: 'Derecho', text: 'Derecho' }
]

export const PeriodoPublicacion: PeriodoPublicacion[] = [
    { value: '1', text: 'Ultima Hora', selector:'1' },
    { value: '24', text: 'Ultimas 24 Horas', selector:'2' },
    { value: '168', text: 'Ultimas 7 dias' , selector:'3'},
    { value: '336', text: 'Ultimos 14 dias', selector:'4' },
    { value: '720', text: 'Ultimos 30 dias', selector:'5' }
]

export const Experiencia: Experiencia[] = [
    { value: '0' , text: 'Sin experiencia'     , selector:'6' },
    { value: '1', text: '1 Año de Experiencia' , selector:'7' },
    { value: '2', text: '2 Años de Experiencia', selector:'8' },
    { value: '3', text: '3 Años de Experiencia', selector:'9' },
    { value: '4', text: '4 Años de Experiencia', selector:'10' },
    { value: '5', text: '5 Años de Experiencia', selector:'11' },
    { value: '6', text: '6 Años de Experiencia', selector:'12' },
    { value: '7', text: '7 Años a mas' , selector:'13'}
]

export const Publicacion: Publicacion [] = [
    { value: 'semanal', text: 'semanal'},
    { value: 'quincenal', text: 'quincenal'},
    { value: 'mensual', text: 'mensual'}
]

export const Remoto: Remoto [] = [
    { value: 'Sí', text: 'Sí'},
    { value: 'No', text: 'No'},
    { value: 'Temporalmente por cuarentena', text: 'Temporalmente por cuarentena'}
]

export const TipoPostulacion: TipoPostulacion[] = [
    { value: 'Part-Time', text: 'Part-Time' },
    { value: 'Full-Time', text: 'Full-Time' } 
]
import { ImagenInterface, ArchivoCVInterface } from 'src/app/pages/tools/general-interface';

export interface PostulanteSigninRequest {
    emailUsuario: string;
    contraseñaUsuario: string;
}

export interface PostulanteAuthorityResponse {
    authority: string;
}

export interface PostulanteSigninResponse {
    type: string;
    token: string;
    idPostulante: bigint;
    emailPostulante: string;
    basicinfoPostulante: PostulanteBasicInfoResponse;
    authorities: PostulanteAuthorityResponse[];
}

export interface PostulanteBasicInfoResponse {
    nombrePostulante: string;
    apellidoPostulante: string;
    ciudadPostulante: string;
    tipodocumentoPostulante: string;
    numerodocumentoPostulante: string;
    fecharegistroPostulante: any; //date
    generoPostulante: string;
    fotoperfilPostulante?: ImagenInterface;
    archivocvPostulante?: ArchivoCVInterface;
}

export interface idempleo {
    idPuestoTrabajo: number;
}

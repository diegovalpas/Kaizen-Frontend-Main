import { ImagenInterface } from 'src/app/pages/tools/general-interface';

export interface ReclutadorSigninRequest {
    emailUsuario: string;
    contraseñaUsuario: string;
}

export interface ReclutadorAuthorityResponse {
    authority: string;
}

export interface ReclutadorSigninResponse {
    type: string;
    token: string;
    idReclutador: bigint;
    emailReclutador: string;
    basicinfoReclutador: ReclutadorBasicInfoResponse;
    authorities: ReclutadorAuthorityResponse[];
}

export interface ReclutadorBasicInfoResponse {
    nombreReclutador: string;//s
    ciudadReclutador: string;//s
    tipodocumentoReclutador: string;
    numerodocumentoReclutador: string;//s
    telefonoReclutador: string;//s
    fecharegistroReclutador: any;//s
    contactanteReclutador: string;//s
    tamanioempresaReclutador: string;//s
    descripcionReclutador: string;
    emailReclutador: string;
    logoempresaReclutador?: ImagenInterface;
}
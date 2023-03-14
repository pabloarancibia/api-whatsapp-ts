import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";
import WsTransporter from "../../infrastructure/repositories/ws.external"
import { image as imageQr } from "qr-image";


class LeadCtrl {
  constructor(
    private readonly leadCreator: LeadCreate,
    private wstransporter: WsTransporter
    ) {}

  public sendCtrl = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.leadCreator.sendMessageAndSave({ message, phone })
    res.send(response);
  };

  public getQrCode = async(req: Request,res: Response)=>{
    const path = `${process.cwd()}/tmp`;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(`${path}/qr.svg`);
  }

  public regenerateQrCode = async(req: Request,res: Response)=>{
    //console.log("actualización qr");
    console.log("logout test");
    const response = await this.leadCreator.logoutSrv();
    res.send(response);
    // this.wstransporter = (new WsTransporter)
    // this.wstransporter.initialize();
    // setTimeout(function() {
    //   console.log("esperado 10seg actualización qr");
    //   return res.status(200).json({
    //     message: 'regenerate qr code'
    //  });
    // }, 10000);
  }
}

export default LeadCtrl;

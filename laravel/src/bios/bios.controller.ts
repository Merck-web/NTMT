import {Controller, Get, Headers} from '@nestjs/common';
import {BiosService} from './bios.service'

@Controller('bios')
export class BiosController {
    constructor(private BiosService: BiosService) {
    }

    @Get('get_bios')
    getBios(@Headers() headers) {
        return this.BiosService.getBios(headers)
    }

}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, map } from 'rxjs';
import { FotoNasa } from '../interfaces/fotoNasa.interface';

import { NasaService } from './nasa.service';

describe('NasaService', () => {
  let service: NasaService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(NasaService);
  });

  it('Debe haberse creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('La función obtenerFotosNasa() debe devolver 6 objetos FotoNasa', (done: DoneFn) => {
    const listaFotos: FotoNasa[] = [];
    httpClientSpy.get.and.returnValue(of(listaFotos));
    service.obtenerFotosNasa().subscribe((resp) => {
      expect(resp.length).toEqual(6);
      done();
    });
    expect(service).toBeTruthy();
  });

  it('La función obtenerFotoNasa(fecha:string) recibe una fecha y devuelve un objeto FotoNasa', (done: DoneFn) => {
    const foto: FotoNasa = {
      copyright: 'Mark Hanson',
      date: '2022-04-14',
      explanation:
        "Spiral arms seem to swirl around the core of Messier 96 in this colorful, detailed portrait of a beautiful island universe. Of course M96 is a spiral galaxy, and counting the faint arms extending beyond the brighter central region it spans 100 thousand light-years or so. That's about the size of our own Milky Way. M96 is known to be 38 million light-years distant, a dominant member of the Leo I galaxy group. Background galaxies and smaller Leo I group members can be found by examining the picture. The most intriguing one is itself a spiral galaxy seen nearly edge on behind the outer spiral arm near the 1 o'clock position from center. Its bright central bulge cut by its own dark dust clouds, the edge-on background spiral appears to be about 1/5 the size of M96. If that background galaxy is similar in actual size to M96, then it would be about 5 times farther away.",
      hdurl:
        'https://apod.nasa.gov/apod/image/2204/M_96_LRGB_CDK_1000_8April2022HansonSelbyFinal1024.jpg',
      media_type: 'image',
      service_version: 'v1',
      title: 'Messier 96',
      url: 'https://apod.nasa.gov/apod/image/2204/M_96_LRGB_CDK_1000_8April2022HansonSelbyFinal1024.jpg',
    };
    let fecha = '2022-04-14';
    httpClientSpy.get.and.returnValue(of(foto));
    service
      .obtenerFotoNasa(fecha)
      .pipe(
        map((element) => {
          let foto = Object.values(element);
          return foto[0];
        })
      )
      .subscribe((resp) => {
        expect(resp).toEqual(foto);
        done();
      });
    expect(service).toBeTruthy();
  });
});

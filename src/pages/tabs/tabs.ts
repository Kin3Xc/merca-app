import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { CarritoPage } from "../carrito/carrito";
import { MasPage } from "../mas/mas";
import { VueltasPage} from '../vueltas/vueltas';

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = CarritoPage;
  tab3Root = VueltasPage;
  tab6Root = MasPage;

  constructor() {}
}

import tz = require("timezone")

import {AbstractSlider, AbstractSliderView, SliderSpec} from "./abstract_slider"
import * as p from "core/properties"

export class DateSliderView extends AbstractSliderView {
  model: DateSlider

  protected _calc_to(): SliderSpec {
    return {
      start: this.model.start,
      end: this.model.end,
      value: [this.model.value],
      step: this.model.step,
    }
  }

  protected _calc_from([value]: number[]): number {
    return value
  }
}

export namespace DateSlider {
  export type Attrs = p.AttrsOf<Props>

  export type Props = AbstractSlider.Props
}

export interface DateSlider extends DateSlider.Attrs {}

export class DateSlider extends AbstractSlider {
  properties: DateSlider.Props

  constructor(attrs?: Partial<DateSlider.Attrs>) {
    super(attrs)
  }

  static initClass(): void {
    this.prototype.default_view = DateSliderView

    this.override({
      format: "%d %b %Y",
    })
  }

  behaviour = "tap" as "tap"
  connected = [true, false]

  protected _formatter(value: number, format: string): string {
    return tz(value, format)
  }
}
DateSlider.initClass()

import { Component } from '@angular/core';
import { G2BarClickItem, G2BarData } from '@delon/chart/bar';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-g2-chart-g2-chart-bar',
  templateUrl: './g2-chart-bar.component.html'
})
export class G2ChartG2ChartBarComponent {
  constructor(private msg: NzMessageService) {}

  salesData = this.genData();

  private genData(): G2BarData[] {
    return new Array(12).fill({}).map((_i, idx) => ({
      x: `${idx + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
      color: idx > 5 ? '#f50' : undefined
    }));
  }

  refresh(): void {
    this.salesData = this.genData();
  }

  handleClick(data: G2BarClickItem): void {
    this.msg.info(`${data.item.x} - ${data.item.y}`);
  }
}

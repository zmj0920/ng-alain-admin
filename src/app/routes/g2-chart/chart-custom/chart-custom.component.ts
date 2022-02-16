import { Component, ElementRef, NgZone } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-chart-custom',
  templateUrl: './chart-custom.component.html'
})
export class ChartCustomComponent {
  constructor(private ngZone: NgZone) {}

  render(el: ElementRef<HTMLDivElement>): void {
    this.ngZone.runOutsideAngular(() => this.chartInit(el.nativeElement));
  }
  private chartInit(el: HTMLElement): void {
    const otherRatio = 6.67 / 100; // Other 的占比
    const otherOffsetAngle = otherRatio * Math.PI; // other 占的角度的一半
    const chart = new Chart({
      container: el,
      autoFit: true,
      height: 500,
      width: el.clientWidth
    });
    chart.legend(false).tooltip({
      showMarkers: false
    });

    const view1 = chart.createView({
      region: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0.5,
          y: 1
        }
      }
    });
    view1.coordinate('theta', {
      radius: 0.7,
      startAngle: 0 + otherOffsetAngle,
      endAngle: Math.PI * 2 + otherOffsetAngle
    });

    view1
      .data([
        { type: '微博', value: 93.33 },
        { type: '其他', value: 6.67 }
      ])
      .interaction('element-highlight')
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#38c060', '#2593fc'])
      .label('value', () => {
        return {
          offset: -10,
          content: (obj: any) => {
            return `${obj.type}\n${obj.value}%`;
          }
        };
      });

    const view2 = chart.createView({
      region: {
        start: {
          x: 0.5,
          y: 0.1
        },
        end: {
          x: 1,
          y: 0.9
        }
      }
    });
    view2
      .axis(false)
      .data([
        { type: '论坛', value: 1.77 },
        { type: '网站', value: 1.44 },
        { type: '微信', value: 1.12 },
        { type: '客户端', value: 1.05 },
        { type: '新闻', value: 0.81 },
        { type: '视频', value: 0.39 },
        { type: '博客', value: 0.37 },
        { type: '报刊', value: 0.17 }
      ])
      .interaction('element-highlight')
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', ['#063d8a', '#0b53b0', '#1770d6', '#2593fc', '#47abfc', '#6dc1fc', '#94d6fd', '#bbe7fe'])
      .label('value', {
        position: 'right',
        offsetX: 5,
        offsetY: 10,
        content: (obj: any) => {
          return `${obj.type} ${obj.value}%`;
        }
      });
    chart.render();
    chart.on('afterpaint', () => {
      const pie_start1 = {
        x: view1.getCoordinate().getCenter().x + Math.cos(Math.PI * 2 - otherOffsetAngle) * view1.getCoordinate().getRadius(),
        y: view1.getCoordinate().getCenter().y + Math.sin(Math.PI * 2 - otherOffsetAngle) * view1.getCoordinate().getRadius()
      };
      const pie_start2 = {
        x: view1.getCoordinate().getCenter().x + Math.cos(otherOffsetAngle) * view1.getCoordinate().getRadius(),
        y: view1.getCoordinate().getCenter().y + Math.sin(otherOffsetAngle) * view1.getCoordinate().getRadius()
      };
      const interval_end1 = {
        x: view2.geometries[0].container.getBBox().minX,
        y: view2.getCoordinate().end.y
      };
      const interval_end2 = {
        x: view2.geometries[0].container.getBBox().minX,
        y: view2.getCoordinate().start.y
      };
      const path = [
        ['M', pie_start1.x, pie_start1.y],
        ['L', pie_start2.x, pie_start2.y],
        ['L', interval_end2.x, interval_end2.y],
        ['L', interval_end1.x, interval_end1.y],
        ['Z']
      ];
      chart.backgroundGroup.addShape('path', {
        attrs: {
          path,
          fill: '#e9f4fe'
        }
      });
      chart.getCanvas().draw();
    });
  }
}

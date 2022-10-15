import React, { useState, useEffect } from 'react';
import { Area, G2 } from '@ant-design/charts';
// import { each, findIndex } from '@antv/util';

const DemoArea = () => {
  const { InteractionAction, registerInteraction, registerAction } = G2;
  const [data, setData] = useState<any[]>([]);
  const [active, setActive] = useState('1246');

  useEffect(() => {
    const datas = [
      {
        Date: '2014-10',
        scales: 1104,
      },
      {
        Date: '2014-11',
        scales: 1246,
        active: true,
      },
      {
        Date: '2014-12',
        scales: 1098,
      },
      {
        Date: '2015-01',
        scales: 1189,
      },
      {
        Date: '2015-02',
        scales: 1276,
      },
      {
        Date: '2015-03',
        scales: 1033,
      },
      {
        Date: '2015-04',
        scales: 956,
      },
      {
        Date: '2015-05',
        scales: 845,
      },
      {
        Date: '2015-06',
        scales: 1089,
      },
      {
        Date: '2015-07',
        scales: 944,
      },
      {
        Date: '2015-08',
        scales: 1043,
      },
      {
        Date: '2015-09',
        scales: 893,
      },
      {
        Date: '2015-10',
        scales: 840,
      },
      {
        Date: '2015-11',
        scales: 934,
      },
      {
        Date: '2015-12',
        scales: 810,
      },
      {
        Date: '2016-01',
        scales: 782,
      },
      {
        Date: '2016-02',
        scales: 1089,
      },
      {
        Date: '2016-03',
        scales: 745,
      },
      {
        Date: '2016-04',
        scales: 680,
      },
      {
        Date: '2016-05',
        scales: 802,
      },
      {
        Date: '2016-06',
        scales: 697,
      },
      {
        Date: '2016-07',
        scales: 583,
      },
      {
        Date: '2016-08',
        scales: 456,
      },
      {
        Date: '2016-09',
        scales: 524,
      },
      {
        Date: '2016-10',
        scales: 398,
      },
      {
        Date: '2016-11',
        scales: 278,
      },
      {
        Date: '2016-12',
        scales: 195,
      },
      {
        Date: '2017-01',
        scales: 145,
      },
      {
        Date: '2017-02',
        scales: 207,
      },
    ];
    setData(datas);
  }, []);

  G2.registerShape('point', 'custom-point', {
    draw(cfg, container) {
      const data: any = cfg.data;
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group = container.addGroup();
      // if (data?.active) {
      //   const decorator1 = group.addShape('circle', {
      //     attrs: {
      //       x: point.x,
      //       y: point.y,
      //       r: 10,
      //       fill: cfg.color,
      //       opacity: 0.5,
      //     },
      //   });
      //   const decorator2 = group.addShape('circle', {
      //     attrs: {
      //       x: point.x,
      //       y: point.y,
      //       r: 10,
      //       fill: cfg.color,
      //       opacity: 0.5,
      //     },
      //   });
      //   const decorator3 = group.addShape('circle', {
      //     attrs: {
      //       x: point.x,
      //       y: point.y,
      //       r: 10,
      //       fill: cfg.color,
      //       opacity: 0.5,
      //     },
      //   });
      //   decorator1.animate(
      //     {
      //       r: 20,
      //       opacity: 0,
      //     },
      //     {
      //       duration: 1800,
      //       easing: 'easeLinear',
      //       repeat: true,
      //     },
      //   );
      //   decorator2.animate(
      //     {
      //       r: 20,
      //       opacity: 0,
      //     },
      //     {
      //       duration: 1800,
      //       easing: 'easeLinear',
      //       repeat: true,
      //       delay: 600,
      //     },
      //   );
      //   decorator3.animate(
      //     {
      //       r: 20,
      //       opacity: 0,
      //     },
      //     {
      //       duration: 1800,
      //       easing: 'easeLinear',
      //       repeat: true,
      //       delay: 1200,
      //     },
      //   );
      //   group.addShape('circle', {
      //     attrs: {
      //       x: point.x,
      //       y: point.y,
      //       r: 6,
      //       fill: cfg.color,
      //       opacity: 0.7,
      //     },
      //   });
      //   group.addShape('circle', {
      //     attrs: {
      //       x: point.x,
      //       y: point.y,
      //       r: 1.5,
      //       fill: cfg.color,
      //     },
      //   });
      // } else
      if (data?.scales < 500) {
        group.addShape('circle', {
          name: 'outer-point',
          attrs: {
            x: point.x,
            y: point.y,
            fill: '#FFD7D7',
            opacity: 1,
            r: 5,
          },
        });
        group.addShape('circle', {
          name: 'inner-point',
          attrs: {
            x: point.x,
            y: point.y,
            fill: '#FF4E50',
            opacity: 1,
            r: 3,
          },
        });
      } else {
        group.addShape('circle', {
          name: 'outer-point',
          attrs: {
            x: point.x,
            y: point.y,
            fill: '#F6F6FD',
            opacity: 1,
            r: 5,
          },
        });
        group.addShape('circle', {
          name: 'inner-point',
          attrs: {
            x: point.x,
            y: point.y,
            fill: '#5050E6',
            opacity: 1,
            r: 3,
          },
        });
      }
      return group;
    },
  });

  class CustomMarkerAction extends InteractionAction {
    active() {
      const view = this.getView();
      const evt = this.context.event;

      if (evt.data) {
        // items: 数组对象，当前 tooltip 显示的每条内容
        const { items } = evt.data;
        const pointGeometries = view.geometries.filter((geom) => geom.type === 'point');
        pointGeometries?.forEach((pointGeometry) => {
          pointGeometry.elements?.forEach((pointElement, idx) => {
            const active = items?.findIndex((item) => item.data === pointElement.data) !== -1;
            const [point0, point1] = pointElement.shape.getChildren();
            // const group = pointElement.shape;
            // const cfg = pointElement.shape.cfg;
            // const point = {
            //   x: cfg.x,
            //   y: cfg.y,
            // };

            console.log(pointElement, 'pointElement');

            if (active) {
              console.log(point0, 'point0');
              // point0.attrs.fill = 'red';

              // // outer-circle
              point0.animate(
                {
                  r: 20,
                  opacity: 0.2,
                },
                {
                  duration: 1800,
                  easing: 'easeLinear',
                  repeat: true,
                },
              );
              // // inner-circle
              // point1.animate(
              //   {
              //     r: 10,
              //     opacity: 0.4,
              //   },
              //   {
              //     duration: 800,
              //     easing: 'easeLinear',
              //     repeat: true,
              //   },
              // );
            } else {
              this.resetElementState(pointElement);
            }
          });
        });
      }
    }

    reset() {
      const view = this.getView();
      const points = view.geometries.filter((geom) => geom.type === 'point');
      points?.forEach((point) => {
        point.elements?.forEach((pointElement) => {
          this.resetElementState(pointElement);
        });
      });
    }

    resetElementState(element) {
      const [point0, point1] = element.shape.getChildren();
      point0.stopAnimate();
      point1.stopAnimate();
      const { r, opacity } = point0.get('attrs');
      point0.attr({
        r,
        opacity,
      });
      const { r: r1, opacity: opacity1 } = point1.get('attrs');
      point1.attr({
        r: r1,
        opacity: opacity1,
      });
    }

    getView() {
      return this.context.view;
    }
  }

  registerAction('custom-marker-action', CustomMarkerAction);
  registerInteraction('custom-marker-interaction', {
    start: [
      {
        trigger: 'tooltip:show',
        action: 'custom-marker-action:active',
      },
    ],
    end: [
      {
        trigger: 'tooltip:hide',
        action: 'custom-marker-action:reset',
      },
    ],
  });

  const config = {
    color: 'rgba(80,80,230,1)',
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0,
      end: 0.5,
      trendCfg: {
        isArea: true,
      },
    },
    point: {
      size: 5,
      shape: 'custom-point',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    label: {},
    areaStyle: () => {
      return {
        fill: 'l(270) 0:rgba(80,80,230,0) 0.5:rgba(80,80,230,0.5) 1:rgba(80,80,230,1)',
      };
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          // stroke: '#000',
          // fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'custom-marker-interaction',
      },
    ],
  };

  return (
    <Area
      key={'888'}
      {...config}
      onReady={(plot) => {
        plot.on('plot:click', (evt) => {
          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
        });
      }}
    />
  );
};

export default DemoArea;

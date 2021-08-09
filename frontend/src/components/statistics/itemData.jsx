const itemData = [
    {
      img: '/images/1.png',
      title: '1',
      author: 'fairyroad1',
      data: 'train/box_loss',
      data2: 'box_loss는 bounding box loss에 해당하는 값으로 box별로 물체검출이 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 box loss는 training전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 잘 학습 되었다고 볼 수 있습니다. '
    },
    {
      img: '/images/2.png',
      title: '2',
      author: 'fairyroad2',
      data: 'train/obj_loss',
      data2: 'obj_loss는 object loss에 해당하는 값으로 물체 검출이 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 object loss는 training전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 학습이 잘 되었다고 볼 수 있습니다.'
    },
    {
      img: '/images/3.png',
      title: '3',
      author: 'fairyroad3',
      data: 'train/cls_loss',
      data2: 'cls_loss는 classification loss에 해당하는 값으로 분류가 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 classification loss는 training전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 학습이 잘 되었다고 볼 수 있습니다. ',
    },
    {
      img: '/images/4.png',
      title: '4',
      author: 'fairyroad4',
      data: 'metrics/precision',
      data2: 'precision은 정확도를 의미하는데 저희 모델의 그래프를 보면 precision값이 증가하기 때문에 정확도가 올라가고 있다는 것을 볼 수 있습니다.'
    },
    {
      img: '/images/5.png',
      title: '5',
      author: 'fairyroad5',
      data: 'metrics/recall',
      data2: 'recall은 검출율을 의미하며, 실제 옳게 검출된 결과물 중에서 옳다고 예측한 것의 비율을 의미합니다. 정확도와 검출율의 성능 변화 전체를 확인하는데 대표적인 방법이 precision-recall 그래프를 이용하는 것입니다. 그래프를 보면 recall의 비율이 높기 때문에 저희의 모델이 실제 옳은 결과중에 옳게 예측할 확률이 높다는 것으로 볼 수 있습니다.'
    },
    {
      img: '/images/6.png',
      title: '6',
      author: 'fairyroad6',
      data: 'val/box_loss',
      data2: 'box_loss는 bounding box loss에 해당하는 값으로 box별로 물체검출이 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 box loss는 test전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 잘 학습 되었다고 볼 수 있습니다. '
    },
    {
      img: '/images/7.png',
      title: '7',
      author: 'fairyroad7',
      data: 'val/obj_loss',
      data2: 'obj_loss는 object loss에 해당하는 값으로 물체 검출이 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 object loss는 test전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 학습이 잘 되었다고 볼 수 있습니다.'
    },
    {
      img: '/images/8.png',
      title: '8',
      author: 'fairyroad8',
      data: 'val/cls_loss',
      data2: 'cls_loss는 classification loss에 해당하는 값으로 분류가 잘 되고 있는지를 확인할 수 있습니다. 저희가 구현한 모델의 classification loss는 test전반에 걸쳐서 값이 감소하고 있기 때문에 구현한 모델이 학습이 잘 되었다고 볼 수 있습니다. ',
    },
    {
      img: '/images/9.png',
      title: '9',
      author: 'fairyroad9',
      data: 'metrics/mAP_0.5',
      data2: 'mAP는 mean average precision의 약자로 물체의 인식 및 탐지 기술의 성능을 평가하기 위해서는 검출율과 정확도를 동시에 고려해야 하기 때문에 컴퓨터 비전 분야에서 물체 검출 및 이미지 분류 알고리즘의 성능을 평가하기 위해 사용됩니다. mAP는 물체 클래스가 여러 개인 경우 각 클래스당 AP를 구한 다음에 그것을 모두 합한 다음에 물체 클래스의 개수로 나눠줌으로써 알고리즘의 성능을 평가합니다. 저희가 구현한 모델은 training의 전반에 걸쳐 precision이 증가하고 있기 때문에 더 많은 training을 거치면 더 좋아질 가능성이 있다고 볼 수 있습니다. 0.05의 단계 크기로 0.5부터 끝까지의 IoU에 대한 mAP에 해당하는 값입니다.'
    },
    {
      img: '/images/10.png',
      title: '10',
      author: 'fairyroad10',
      data: 'metrics/mAP_0.5:0.95',
      data2: 'mAP는 mean average precision의 약자로 물체의 인식 및 탐지 기술의 성능을 평가하기 위해서는 검출율과 정확도를 동시에 고려해야 하기 때문에 컴퓨터 비전 분야에서 물체 검출 및 이미지 분류 알고리즘의 성능을 평가하기 위해 사용됩니다. mAP는 물체 클래스가 여러 개인 경우 각 클래스당 AP를 구한 다음에 그것을 모두 합한 다음에 물체 클래스의 개수로 나눠줌으로써 알고리즘의 성능을 평가합니다. 저희가 구현한 모델은 training의 전반에 걸쳐 precision이 증가하고 있기 때문에 더 많은 training을 거치면 더 좋아질 가능성이 있다고 볼 수 있습니다. 0.05의 단계 크기로 0.5부터 0.95까지의 IoU에 대한 mAP에 해당하는 값입니다.'
    },
  ];
  
  export default itemData;
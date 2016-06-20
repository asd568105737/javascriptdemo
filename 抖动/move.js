/**
 * ��ȡ����ֵ
 * @param obj:����
 * @param attr:���� 
 */
function getStyle ( obj, attr ) {  
 if(obj.currentStyle)  
    {   
        return obj.currentStyle[attr];  
    }  
    else  
    {   
        return getComputedStyle(obj,false)[attr];  
    }  
}
/**
 * �˶�
 * @param obj:����
 * @param attr:����
 * @param speed:�ٶ�
 * @param target:Ŀ��λ��
 * @param fn:�ص�����
 */
function moveStyle(obj,attr,speed,target,fn){
	var speed=parseInt(getStyle(obj,attr))<target?speed:-speed;//��ȡ�ƶ��ٶ�  
	clearInterval( obj.timer );//�����ʱ��
	obj.timer = setInterval(function () {//�˶���ʱ
		
		var dir = parseInt(getStyle( obj, attr )) + speed;			// �ƶ� 
		obj.style[attr] = dir + 'px';  
		if(Math.abs(target-dir)<=Math.abs(speed)){
			obj.style[attr] =target +'px';
			dir=target;
		}  
		if ( dir == target ) {
			clearInterval(obj.timer); 
			console.log("�˶�����") 
			if(null!=fn){
				fn();
			}
			
		}
		
	}, 100);
}
/**
 * ���¼�
 * @param obj:����
 * @param evname:�¼�����
 * @param fn:����
 */
function bind(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}
/**
 * �����˶����
 * 
 * @param obj:����
 * @param json:����ֵ
 * @param fn:�ص�����
 */

function startMove(obj, json, fn) {
	clearInterval(obj.timer);// �����ʱ��
	obj.timer = setInterval(function() {
		var bStop = true; // �Ƿ�ֹͣ
		for ( var attr in json) {
			var cur = 0;

			if (attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}

			var speed = (json[attr] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if (cur != json[attr])
				bStop = false;

			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
				obj.style.opacity = (cur + speed) / 100;
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}

		if (bStop) {
			clearInterval(obj.timer);

			if (fnEnd)
				fnEnd();
		}

	}, 1000);

}
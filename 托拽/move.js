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
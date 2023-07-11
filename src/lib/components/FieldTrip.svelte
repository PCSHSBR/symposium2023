<script>
	import KaoPanomRung from '$lib/assets/images/ปราสาทรเขาพนมรุ้ง.jpg';
	import ChangArean from '$lib/assets/images/ChangArean.jpg';

	import Icon from '@iconify/svelte';
</script>

<div class="trip-container">
	<div class="item">
		<div class="d-image">
			<img src={KaoPanomRung} alt="" />
		</div>
		<div class="d-info">
			<h1>เขาพนมรุ้ง</h1>
			<p class="line-clamp-3 text-ellipsis">
				อุทยานประวัติศาสตร์พนมรุ้ง หรือ ปราสาทหินพนมรุ้ง เป็นหนึ่งในปราสาทหินในกลุ่มราชมรรคา
				ตั้งอยู่ที่หมู่ที่ 2 (บ้านดอนหนองแหน) ตำบลตาเป๊ก อำเภอเฉลิมพระเกียรติ
				ห่างจากตัวเมืองบุรีรัมย์ลงมาทางทิศใต้ประมาณ 77 กิโลเมตร ประกอบไปด้วยโบราณสถานสำคัญ
				ซึ่งตั้งอยู่บนยอดภูเขาไฟที่ดับสนิทแล้ว สูงประมาณ 200 เมตรจากพื้นราบ (ประมาณ 350
				เมตรจากระดับน้ำทะเลปานกลาง) คำว่า พนมรุ้ง นั้น มาจากภาษาเขมร คำว่า วนํรุง แปลว่า ภูเขาใหญ่
			</p>
			<a href="" class="btn-primary btn mt-4"><Icon icon="mdi:open-in-new" />อ่านต่อ</a>
		</div>
	</div>
	<div class="item">
		<div class="d-image">
			<img src={ChangArean} alt="" />
		</div>
		<div class="d-info">
			<h1>ช้างอารีนา</h1>
			<p class="line-clamp-3 text-ellipsis">
				ช้างอารีนา (อังกฤษ: Chang Arena, ชื่อเดิม: ไอ-โมบาย สเตเดียม) มีชื่ออย่างไม่เป็นทางการว่า
				ธันเดอร์คาสเซิลสเตเดียม (อังกฤษ: Thunder Castle Stadium)
				เป็นสนามกีฬาที่สร้างขึ้นเพื่อใช้เป็นสนามเหย้าของสโมสรฟุตบอลบุรีรัมย์ ยูไนเต็ด
				ตั้งอยู่ที่ตำบลในเมือง อำเภอเมืองบุรีรัมย์ จังหวัดบุรีรัมย์ สนามแห่งนี้มีความจุ 24,000
				ที่นั่ง (ในปี พ.ศ. 2557 ได้ต่อเติมเป็น 32,600 ที่นั่ง) โครงสร้างประกอบด้วยเหล็กและไฟเบอร์
				ซึ่งสร้างด้วยงบประมาณกว่า 500 ล้านบาท
				โดยเป็นเงินสนับสนุนภายใต้สัญญาการกำหนดชื่อจากไอ-โมบายและบางส่วนของนายเนวิน ชิดชอบ
				จัดเป็นสนามฟุตบอลที่ได้มาตรฐานแห่งแรกและแห่งเดียวในประเทศไทยที่ไม่มีลู่วิ่งคั่นสนามและผ่านมาตรฐานระดับโลกจากสหพันธ์ฟุตบอลระหว่างประเทศ,มาตรฐานสนามกีฬาระดับเอจากสมาพันธ์ฟุตบอลเอเชีย
				และสหพันธ์ฟุตบอลอาเซียน
				และยังได้บันทึกลงกินเนสบุ๊คว่าเป็นสนามฟุตบอลในระดับฟีฟ่าที่ใช้เวลาก่อสร้างน้อยที่สุดในโลกคือ
				256 วัน
			</p>
			<a href="" class="btn-primary btn mt-4"><Icon icon="mdi:open-in-new" />อ่านต่อ</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.event-trip {
		.trip-container {
			.item {
				@apply my-4 grid grid-cols-1 overflow-hidden transition-all;
				@media (min-width: 768px) {
					grid-template-columns: 400px 1fr;
				}
				.d-image {
					@apply flex flex-col items-center justify-center;
					img {
						@apply h-full w-full rounded-xl object-cover;
					}
				}
				.d-info {
					@apply my-auto bg-base-100/70 p-6 text-left;
					h1 {
						@apply font-bold;
					}
					p {
						@apply text-sm;
					}
				}
			}
		}
	}
</style>

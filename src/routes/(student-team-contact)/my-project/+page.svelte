<script>
	import postcss from "postcss";
  import Icon from "@iconify/svelte";

</script>

<section class="m-auto w-[calc(100%-64px)] pt-[calc(6rem)]">
  <h1 class="text-2xl">แก้ไขข้อมูลโครงงาน</h1>
  <div class="custom-steps step1 mt-4">
    <div class="custom-step custom-step-primary">
      <span><Icon icon="mdi:check" /></span>
      <span></span>
    </div>
    <div>
      <h1 class="text-2xl">สร้างบัญชี</h1>
      <p>คุณได้สร้างบัญชีเรียบร้ายแล้ว</p>
      <button class="btn btn-primary my-2"><Icon icon="mdi:edit"/> แก้ไข</button>
    </div>
  </div>
  <div class="custom-steps step2">
    <div class="custom-step custom-step-onprogress">
      <span>2</span>
      <span></span>
    </div>
    <div>
      <h1 class="text-2xl">ข้อมูลโครงงาน</h1>
      <p>รายละเอียดต่างๆของโครงงาน</p>
      <p class="whitespace-pre-line">
        <b>ชื่อโครงงาน : </b> EXAMPLE
        <b>สาขา : </b> ชีววิทยาและสิ่งแวดล้อม
        <b>ประเภทการนำเสนอ : </b> ภาคบรรยายภาษาไทย (Thai oral presentation)
        โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์

        <b>ตัวแทนติดต่อของทีม : </b> นายพัสกร ยืนยง (คุณ)
        <b>สมาชิกในทีม : </b> นายพัสกร ยืนยง, นายพัฒนเดช รุ่งรัศมีทรัพย์, นางสาวกุลนิดา พงศ์ไพศาล
        <b>ครูที่ปรึกษาโครงงาน : </b> นายพชร กาญจนมาศ, 
        <b>ที่ปรึกษาพิเศษ : </b> ศาสตรจารย์สราวลี เจริญผลวัฒนา
      </p>
      <button class="btn btn-primary my-2"><Icon icon="mdi:edit"/> แก้ไข</button>
    </div>
  </div>
  <div class="custom-steps step3">
    <div class="custom-step">
      <span>3</span>
      <span></span>
    </div>
    <div>
      <h1 class="text-2xl">อัปโหลดบทคัดย่อ</h1>
      <p>บทคัดย่อของโครงงาน</p>
      <p class="whitespace-pre-line">
        <b>บทคัดย่อ : </b> แอบมองดูฟ้าที่ค้างในใจที่มีในเวลานี้ก็บอกไปเลยไม่สนก็ได้ถึงเวลาที่ฉันจะเดินไปเลยไม่หยุดได้จับ
        มือฉันลมแปรเปลี่ยนตามไปบนท้องฟ้าแล้วที่เธอนั้นมีอยู่ข้างในใจทุกทุกครั้งที่ต้องการใครที่คอยวนเวียนทำยัง
        ไม่ต้องไปนึกเกรงและหวาดกลัวอย่างนี้ไม่ต้องไปจำได้วางบางอย่างเดิมหรือไปด้วยกันนะเราจะกอดเธอ...
      </p>
      <button class="btn btn-primary my-2"><Icon icon="mdi:upload"/> อัปโหลด</button>
    </div>
  </div>
  <div class="custom-steps step4">
    <div class="custom-step custom-step-last">
      <span>4</span>
      <span></span>
    </div>
    <div>
      <h1 class="text-2xl">อัปโหลดบทความวิชาการ</h1>
      <p>บทความเชิงวิชาการของโครงงาน</p>
      <button class="btn btn-primary my-2"><Icon icon="mdi:upload"/> อัปโหลด</button>
    </div>
  </div>
</section>


<style lang="postcss">
  .custom-steps {
    @apply flex flex-row relative mt-8;
  }
  .custom-step{
    @apply m-8 flex flex-col items-center;
  }
  .custom-step span:first-child {
    @apply bg-base-200 rounded-[50%] w-[3rem] h-[3rem] absolute flex items-center justify-center text-white left-0 top-0;
  }
  .custom-step span:last-child{
    @apply bg-base-200 h-[100%] w-[8px] absolute left-[1.3rem] -z-[10];
  }

  .custom-step-primary span:first-child,.custom-step-primary span:last-child{
    @apply bg-primary;
  }

  .custom-step-last span:last-child{
    @apply hidden;
  }
  .custom-step-onprogress span:first-child{
    @apply bg-primary;
  }

</style>
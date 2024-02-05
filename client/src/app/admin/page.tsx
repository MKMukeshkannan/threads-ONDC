import Input from "@/components/Input";

export default function Admin() {
  return (
    <main className="flex min-h-screen flex-col items-right bg-lightBeige p-4 lg:p-24">
      <h1 className="text-5xl font-black font-mono mb-10">ADMIN</h1>
      <form className="flex flex-col max-w-96 space-y-5">
        <Input placeholder="Name" />
        <Input placeholder="Retailer" />
        <Input placeholder="Price" />
        <Input placeholder="Brand" />

        <section className="flex justify-between">
          <h1 className="inline-flex text-xl font-black font-mono">
            Product Image
          </h1>

          <input type="file" className="w-1/3 text-base" />
        </section>
        <section className="flex justify-between">
          <h1 className="inline-flex w-2/3 text-xl font-black font-mono">
            Texture Map
          </h1>

          <input type="file" className="w-1/3 text-base" />
        </section>
        <button className="font-mono font-black p-5 max-w-fit h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white">
          Submit
        </button>
      </form>
    </main>
  );
}

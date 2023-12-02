import puppeteer from "puppeteer";

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	});
	const page = await browser.newPage();

	await page.goto("https://www.dartshive.jp/shopdetail/000000041288/#detail");

	const table = await page.$(".table-default");

	if (!table) {
		console.log("table is null");
		return;
	}

	const tbody = await page.evaluate((table) => {
		const tbody = table.querySelector("tbody")?.textContent;
		return tbody;
	}, table);

	const tbodyArray = tbody?.split("\n");
	const tableObject: { [key: string]: string } = {};

	// biome-ignore lint/complexity/noForEach: <explanation>
	tbodyArray?.forEach((value, index) => {
		if (index % 2 === 0 && value !== "") {
			tableObject[value] = tbodyArray[index + 1];
		}
	});

	console.log(tableObject);

	await browser.close();
})();

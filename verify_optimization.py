from playwright.sync_api import sync_playwright

def verify_optimization():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Verify preconnect
        count = page.locator('link[rel="preconnect"][href="https://sepolia.basescan.org"]').count()
        print(f"Preconnect link found: {count > 0}")

        # Verify logo size
        logo = page.locator('.navbar__logo')
        box = logo.bounding_box()
        if box:
            print(f"Logo bounding box: {box}")
            if box['width'] == 32 and box['height'] == 32:
                print("Logo size is correct (32x32).")
            else:
                print(f"ERROR: Logo size is incorrect: {box['width']}x{box['height']}")

        page.screenshot(path="verification.png")
        browser.close()

if __name__ == "__main__":
    verify_optimization()

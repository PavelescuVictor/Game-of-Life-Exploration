const execa = require("execa");
const fs = require("fs");

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        await execa("git", ["add", "--all"]);
        await execa("git", [
            "commit",
            "-m",
            "gh-pages",
        ]);
        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await execa("git", ["checkout", "-f", "master"]);
        await execa("git", ["branch", "-D", "gh-pages"]);
        console.log("Successfully deployed");
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
})();

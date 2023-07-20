# GitHub Bulk Sponsoring

With GitHub bulk sponsoring we have a great tool to export a list of current dependencies.  
It however doesn't allow us to easily configure amounts and exceptions.

This repository contains a script that will fill the bulk sponsoring CSV with the preferred amounts.  
It also allows us to track recipients over time.

Steps :
1. export the your list from GitHub
2. run the scripts
3. upload the filled in lists back to GitHub

## Why

We do not want to spend time making lists of who should be sponsored and for how much.
We also don't want to spend time making sure these lists are always up to date.

We believe that all our dependencies should be supported either financially or through code contributions.  
By sponsoring a tiny amount to all dependencies we hope to help a little bit.
If more small companies do this, it will start to add up.

We hope to make it easier for other companies to do the same.

## How to

### Set the amounts

- open `fill.mjs`
- set `SPONSOR_AMOUNT_REGULAR` (default: 1)
- set `SPONSOR_AMOUNT_FOUNDATIONAL` (default: 2)

### Build the list

- visit : https://github.com/sponsors/explore?direct=0
- download the CSV of used dependencies
- check your email for the download link
- replace `export.csv` with the downloaded file (or paste the contents)
- run `node clean-export.mjs`
- run `node fill.mjs`

### Bulk sponsoring

- visit : https://github.com/sponsors/bulk-sponsorships/import/new
- upload `sponsor-log-0.csv`
- repeat this for every file

_uploads are currently limited to 100 recipients per file_

### Repeat after X months

GitHub bulk sponsoring is not recurring yet.  
So repeat this process every few months to keep sponsoring.

## Additional recipients

GitHub can only find dependencies through package manager manifest files.  
Some dependencies like `curl` are typically part of an OS and not visible to GitHub.  

If there are any additional dependencies that you want to sponsor, add them to `additional.csv`.  
The format is the same as `export.csv`.

You do have to manually set the amount for each additional recipient.

## Code contributions

Sometimes we make substantial contributions to specific projects or even maintain them.  
We do not want to sponsor these financially because we are already donating time.

To mark these projects as code contributions, add them to `code-contributions.csv`.  
The last column in the CSV must be a number higher than zero.

## Foundational

Some dependencies are super critical to our business.  
We mark them in `foundational-work.csv` to increase the chance of continued maintenance and development.

These will receive a higher amount than the other dependencies.

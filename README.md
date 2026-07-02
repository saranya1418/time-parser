# Time Parser

## Overview

This project implements a simple relative time parser inspired by logging platforms such as Splunk.

The parser accepts expressions such as:

- now()
- now()+1d
- now()+10d+12h
- now()-2d+12h

and returns the calculated date in UTC.

## Supported Operators

- + Add time
- - Subtract time

## Supported Time Units

- s - Seconds
- m - Minutes
- h - Hours
- d - Days
- mon - Months
- y - Years

## Run

```bash
node index.js
```

## Notes

- Uses UTC date calculations.
- Supports multiple time modifiers.
- Performs basic input validation.
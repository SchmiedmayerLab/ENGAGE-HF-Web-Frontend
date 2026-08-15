#!/bin/bash

#
# This source file is part of the ENGAGE-HF Web Frontend open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

set -e

CONTENT=$(curl --fail http://localhost)
echo "$CONTENT" | grep "ENGAGE-HF"

echo "✅ Test Passed!"

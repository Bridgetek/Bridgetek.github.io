.. _Developer Section: How to Build and Run the Photobooth:


Developer Section: How to Build and Run the Photobooth
==========

.. admonition:: 🛠️ Developer Section: How to Build and Run the Photobooth
   :class: sphinx-feature

   - Hardware connection:


      .. list-table:: Wiring
         :widths: auto
         :header-rows: 1

         * - BT820 EVE
            - ESP32 mcu
         * - Host
            - SPI1
         * - VCC
            - 3.3V
         * - GND
            - GND
         * - DO
            - GPIO7
         * - DI
            - GPIO8
         * - SK
            - GPIO6
         * - CS
            - GPIO13


   - Software Setup
      Prepare your build environment by follloing this guideline: `using-docker-container.md <https://github.com/espressif/vscode-esp-idf-extension/blob/master/docs/tutorial/using-docker-container.md>`_.

   - How to build
      1. Install the `usbipd-win <https://github.com/dorssel/usbipd-win>`_. tool by: winget install usbipd

      2. On window terminal, share the ESP's locally connected USB devices to other machines (VScode) by:

         .. code-block:: bash

            $ usbipd list | grep JTAG | cut -d" " -f1
            # assume the above command output "2-3":
            $ usbipd attach --wsl --busid 2-3
            $ usbipd bind --busid 2-3
         
         One line version (need wsl or cygwin installed):

         .. code-block:: bash

            FOR /F "delims=" %i IN ('usbipd list ^| grep JTAG ^| cut -d" " -f1') DO echo %i & usbipd attach --wsl --busid %i & usbipd bind --busid %i

      3. Open VScode, open local folder with dev container by command: 
            
         .. code-block:: bash
            
            "Dev Containers: Reopen Folder Locally"

         Configure the dev container as below:
      
         .. code-block:: bash

            Configure extension
               -> Use existing config 
               -> /opt/esp/config
      4. On VScode, type: Ctrl Shift P, type: "ESP-IDF: Build, Flash and Start a Monitor on your Device"

         Demo should start after that


         .. image:: demo_v1.2.3.jpg
             :target: https://brtchip.com
             :alt: EW2024 Phototbooth

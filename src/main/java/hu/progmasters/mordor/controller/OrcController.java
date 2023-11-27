/*
 * Copyright © Progmasters (QTC Kft.), 2016-2019.
 * All rights reserved. No part or the whole of this Teaching Material (TM) may be reproduced, copied, distributed,
 * publicly performed, disseminated to the public, adapted or transmitted in any form or by any means, including
 * photocopying, recording, or other electronic or mechanical methods, without the prior written permission of QTC Kft.
 * This TM may only be used for the purposes of teaching exclusively by QTC Kft. and studying exclusively by QTC Kft.’s
 * students and for no other purposes by any parties other than QTC Kft.
 * This TM shall be kept confidential and shall not be made public or made available or disclosed to any unauthorized person.
 * Any dispute or claim arising out of the breach of these provisions shall be governed by and construed in accordance with the laws of Hungary.
 */

package hu.progmasters.mordor.controller;

import hu.progmasters.mordor.domain.dto.OrcDetails;
import hu.progmasters.mordor.domain.dto.OrcFormData;
import hu.progmasters.mordor.domain.dto.OrcListItem;
import hu.progmasters.mordor.service.OrcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcs")
public class OrcController {

    private final OrcService orcService;

    @Autowired
    public OrcController(OrcService orcService) {
        this.orcService = orcService;
    }

    @GetMapping("/formData")
    public ResponseEntity<OrcFormData> getOrcFormData() {
        OrcFormData formData = new OrcFormData(orcService.getWeaponOptions(), orcService.getOrcRaceTypes());
        return new ResponseEntity<>(formData, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> saveOrc(@RequestBody OrcDetails orcDetails) {
        orcService.saveOrc(orcDetails);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<OrcListItem>> listAll() {
        List<OrcListItem> orcListItemList = orcService.findAll();
        return new ResponseEntity<>(orcListItemList, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeOrc(@PathVariable Long id) {
        orcService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

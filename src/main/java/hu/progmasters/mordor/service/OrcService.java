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

package hu.progmasters.mordor.service;

import hu.progmasters.mordor.domain.Orc;
import hu.progmasters.mordor.domain.OrcRaceType;
import hu.progmasters.mordor.domain.WeaponType;
import hu.progmasters.mordor.domain.dto.OrcDetails;
import hu.progmasters.mordor.domain.dto.OrcRaceTypeOption;
import hu.progmasters.mordor.domain.dto.WeaponOption;
import hu.progmasters.mordor.repository.OrcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrcService {

    private OrcRepository orcRepository;

    @Autowired
    public OrcService(OrcRepository orcRepository) {
        this.orcRepository = orcRepository;
    }

    public Orc saveOrc(OrcDetails orcDetails) {
        Orc orc = new Orc(orcDetails);
        return orcRepository.save(orc);
    }

    public List<WeaponOption> getWeaponOptions() {
        List<WeaponOption> weaponOptions = new ArrayList<>();
        for (WeaponType weaponType : WeaponType.values()) {
            weaponOptions.add(new WeaponOption(weaponType));
        }
        return weaponOptions;
    }

    public List<OrcRaceTypeOption> getOrcRaceTypes() {
        List<OrcRaceTypeOption> orcRaceTypeOptions = new ArrayList<>();
        for (OrcRaceType orcRaceType : OrcRaceType.values()) {
            orcRaceTypeOptions.add(new OrcRaceTypeOption(orcRaceType));
        }
        return orcRaceTypeOptions;
    }

    public List<OrcDetails> findAll() {
        List<Orc> orcList = orcRepository.findAll();
        return orcList
                .stream()
                .map(OrcDetails::new)
                .collect(Collectors.toList());

    }
}

/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: modules/components/bind-code.directive.coffee
 */

export let BindCode = ($sce, $parse, $compile, wysiwygService, wysiwygCodeHightlighterService) =>
  ({
    restrict: "A",
    compile(tElement, tAttrs) {
        const tgBindCodeGetter = $parse(tAttrs.tgBindCode);
        const tgBindCodeWatch = $parse(tAttrs.tgBindCode, (value) => (value || "").toString());

        $compile.$$addBindingClass(tElement);

        return function(scope, element, attr) {
            $compile.$$addBindingInfo(element, attr.tgBindCode);

            return scope.$watch(tgBindCodeWatch, function() {
                const html = wysiwygService.getHTML(tgBindCodeGetter(scope));

                element.html($sce.getTrustedHtml(html) || "");

                return wysiwygCodeHightlighterService.addHightlighter(element);
            });
        };
    },

  })
;
